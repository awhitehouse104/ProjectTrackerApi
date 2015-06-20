using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using Newtonsoft.Json;
using ProjectTrackerApi.Data;

namespace ProjectTrackerApi.Models
{
    public class TokenResult
    {
        public string Token { get; set; }

        public static string GenerateToken(string userName)
        {
            using (var db = new ProjectTrackerDataContext())
            {
                var secretKey = db.TokenSettings.FirstOrDefault().SecretKey;
                var payload = new Dictionary<string, object>
                {
                    { "user", userName }
                };

                return JWT.JsonWebToken.Encode(payload, secretKey, JWT.JwtHashAlgorithm.HS256);
            }
        }
    }
}