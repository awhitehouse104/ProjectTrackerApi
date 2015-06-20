using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProjectTrackerApi.Models
{
    public class SignupRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}