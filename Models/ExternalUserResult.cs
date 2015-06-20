using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using OAuth2.Models;

namespace ProjectTrackerApi.Models
{
    public class ExternalUserResult
    {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("username")]
        public string Username { get; set; }

        [JsonProperty("full_name")]
        public string FullName { get; set; }
    }
}
