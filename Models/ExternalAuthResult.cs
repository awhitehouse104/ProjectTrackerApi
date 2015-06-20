using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace ProjectTrackerApi.Models
{
    public class ExternalAuthResult
    {
        [JsonProperty("access_token")]
        public string AccessToken { get; set; }

        [JsonProperty("user")]
        public ExternalUserResult User { get; set; }
    }
}