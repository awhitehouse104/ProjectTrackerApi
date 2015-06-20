using System;
using System.Collections.Specialized;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using ProjectTrackerApi.Data;
using ProjectTrackerApi.Models;
using OAuth2.Client.Impl;
using OAuth2.Configuration;
using OAuth2.Infrastructure;
using OAuth2.Models;
using ProjectTrackerApi.Utilities;
using TweetSharp;

namespace ProjectTrackerApi.Controllers
{
    public class AuthController : ApiController
    {
        [HttpPost]
        public IHttpActionResult Signup(JObject value)
        {
            if (value == null || value["email"] == null || value["password"] == null)
            {
                return BadRequest("No data recieved.");
            }

            var userRequest = value.ToObject<SignupRequest>();

            if (userRequest.Password.Length < 8)
            {
                return BadRequest("Password length demands not met.");
            }

            using (var db = new ProjectTrackerDataContext())
            {
                var existingUser = db.Users.FirstOrDefault(d => d.Username == userRequest.Email);
                if (existingUser != null)
                {
                    return BadRequest("Account already exists.");
                }

                var user = new User
                {
                    Username = userRequest.Email,
                    PasswordSalt = StringUtilities.GenerateRandomString(16)
                };
                user.Password = userRequest.Password.ToSaltedHash(user.PasswordSalt);

                db.Users.InsertOnSubmit(user);
                db.SubmitChanges();
            }

            return Ok();
        }

        [HttpPost]
        public IHttpActionResult Login(JObject value)
        {
            if (value == null || value["email"] == null || value["password"] == null)
            {
                return BadRequest("No data recieved.");
            }

            var userRequest = value.ToObject<SignupRequest>();

            using (var db = new ProjectTrackerDataContext())
            {
                var existingUser = db.Users.FirstOrDefault(d => d.Username == userRequest.Email);
                if (existingUser == null)
                {
                    return Unauthorized();
                }

                var encodedPassword = userRequest.Password.ToSaltedHash(existingUser.PasswordSalt);
                if (!string.Equals(encodedPassword, existingUser.Password))
                {
                    return Unauthorized();
                }
            }

            return Ok(new TokenResult { Token = TokenResult.GenerateToken(userRequest.Email) });
        }

        [HttpPost]
        public IHttpActionResult Facebook(JObject value)
        {
            if (value == null)
            {
                return NotFound();
            }

            var authInfo = value.ToObject<ExternalAuthInfo>();

            if (authInfo == null || string.IsNullOrEmpty(authInfo.Code))
            {
                return NotFound();
            }

            var client = new FacebookClient(new RequestFactory(), new RuntimeClientConfiguration
            {
                ClientId = AuthSettings.FacebookClientId,
                ClientSecret = AuthSettings.FacebookClientSecret,
                RedirectUri = authInfo.RedirectUri
            });

            UserInfo userInfo;
            try
            {
                userInfo = client.GetUserInfo(new NameValueCollection { { "code", authInfo.Code } });
            }
            catch (Exception ex)
            {
                return BadRequest("Unable to get user info. Details: " + ex.Message);
            }

            return Ok(new TokenResult { Token = TokenResult.GenerateToken(userInfo.Email) });
        }

        [HttpPost]
        public IHttpActionResult Google(JObject value)
        {
            if (value == null)
            {
                return NotFound();
            }

            var authInfo = value.ToObject<ExternalAuthInfo>();

            if (authInfo == null || string.IsNullOrEmpty(authInfo.Code))
            {
                return NotFound();
            }

            var client = new GoogleClient(new RequestFactory(), new RuntimeClientConfiguration
            {
                ClientId = AuthSettings.GoogleClientId,
                ClientSecret = AuthSettings.GoogleClientSecret,
                RedirectUri = authInfo.RedirectUri
            });

            UserInfo userInfo;
            try
            {
                userInfo = client.GetUserInfo(new NameValueCollection { { "code", authInfo.Code } });
            }
            catch (Exception ex)
            {
                return BadRequest("Unable to get user info. Details: " + ex.Message);
            }

            return Ok(new TokenResult { Token = TokenResult.GenerateToken(userInfo.Email) });
        }

        [HttpPost]
        public IHttpActionResult Twitter(JObject value)
        {
            if (value == null || value["oauth_token"] == null || value["oauth_verifier"] == null)
            {
                var service = new TwitterService(AuthSettings.TwitterClientId, AuthSettings.TwitterClientSecret);
                var requestToken = service.GetRequestToken("http://projecttrackerapi.azurewebsites.net");

                return Ok(new TwitterResult {OauthToken = requestToken.Token});
            }
            else
            {
                var requestToken = new OAuthRequestToken { Token = value["oauth_token"].ToString() };
                var service = new TwitterService(AuthSettings.TwitterClientId, AuthSettings.TwitterClientSecret);
                var accessToken = service.GetAccessToken(requestToken, value["oauth_verifier"].ToString());

                service.AuthenticateWith(accessToken.Token, accessToken.TokenSecret);

                TwitterUser userInfo;
                try
                {
                    userInfo = service.VerifyCredentials(new VerifyCredentialsOptions());
                }
                catch (Exception ex)
                {
                    return BadRequest("Unable to get user info. Details: " + ex.Message);
                }

                return Ok(new TokenResult { Token = TokenResult.GenerateToken(userInfo.Name) });
            }
        }

        [HttpPost]
        public IHttpActionResult Instagram(JObject value)
        {
            if (value == null)
            {
                return NotFound();
            }

            var authInfo = value.ToObject<ExternalAuthInfo>();

            if (authInfo == null || string.IsNullOrEmpty(authInfo.Code))
            {
                return NotFound();
            }

            var req = (HttpWebRequest)WebRequest.Create("https://api.instagram.com/oauth/access_token");
            var enc = new ASCIIEncoding();

            var postData = new StringBuilder();
            postData.Append("client_id=" + AuthSettings.InstagramClientId);
            postData.Append("&client_secret=" + AuthSettings.InstagramClientSecret);
            postData.Append("&grant_type=authorization_code");
            postData.Append("&redirect_uri=" + authInfo.RedirectUri);
            postData.Append("&code=" + authInfo.Code);

            var data = enc.GetBytes(postData.ToString());

            req.Method = "POST";

            using (var str = req.GetRequestStream())
            {
                str.Write(data, 0, data.Length);
            }

            ExternalAuthResult userInfo;
            try
            {
                var response = (HttpWebResponse)req.GetResponse();
                var responseStr = new StreamReader(response.GetResponseStream()).ReadToEnd();

                userInfo = JsonConvert.DeserializeObject<ExternalAuthResult>(responseStr);
            }
            catch (Exception ex)
            {
                return BadRequest("Unable to get user info. Details: " + ex.Message);
            }

            return Ok(new TokenResult { Token = TokenResult.GenerateToken(userInfo.User.Username) });
        }
    }
}
