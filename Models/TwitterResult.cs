using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace ProjectTrackerApi.Models
{
    public class TwitterResult
    {
        [JsonProperty("oauth_token")]
        public string OauthToken { get; set; }
    }
}