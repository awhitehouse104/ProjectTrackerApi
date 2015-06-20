using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProjectTrackerApi.Models
{
    public class ExternalAuthInfo
    {
        public string ClientId { get; set; }
        public string Code { get; set; }
        public string RedirectUri { get; set; }
        public string InviteToken { get; set; }
    }
}