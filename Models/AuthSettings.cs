using System.Linq;
using ProjectTrackerApi.Data;

namespace ProjectTrackerApi.Models
{
    public static class AuthSettings
    {
        static AuthSettings()
        {
            using (var db = new ProjectTrackerDataContext())
            {
                var oAuthSettings = db.OAuthSettings;

                FacebookClientId = oAuthSettings.FirstOrDefault(d => d.Provider == "Facebook" && d.IdentificationType == "Id").Value;
                FacebookClientSecret = oAuthSettings.FirstOrDefault(d => d.Provider == "Facebook" && d.IdentificationType == "Secret").Value;
                GoogleClientId = oAuthSettings.FirstOrDefault(d => d.Provider == "Google" && d.IdentificationType == "Id").Value;
                GoogleClientSecret = oAuthSettings.FirstOrDefault(d => d.Provider == "Google" && d.IdentificationType == "Secret").Value;
                TwitterClientId = oAuthSettings.FirstOrDefault(d => d.Provider == "Twitter" && d.IdentificationType == "Id").Value;
                TwitterClientSecret = oAuthSettings.FirstOrDefault(d => d.Provider == "Twitter" && d.IdentificationType == "Secret").Value;
                InstagramClientId = oAuthSettings.FirstOrDefault(d => d.Provider == "Instagram" && d.IdentificationType == "Id").Value;
                InstagramClientSecret = oAuthSettings.FirstOrDefault(d => d.Provider == "Instagram" && d.IdentificationType == "Secret").Value;
            }
        }

        public static readonly string FacebookClientId;
        public static readonly string FacebookClientSecret;
        public static readonly string GoogleClientId;
        public static readonly string GoogleClientSecret;
        public static readonly string TwitterClientId;
        public static readonly string TwitterClientSecret;
        public static readonly string InstagramClientId;
        public static readonly string InstagramClientSecret;
    }
}
