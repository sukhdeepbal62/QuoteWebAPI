using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuoteWebAPI.Models
{
    // Represent Quote Details
    public class Quote
    {
        // Quote ID
        public int Id { get; set; }

        // Quote Text
        public string QuoteText { get; set; }

        // Quote Rating
        public int Rating { get; set; }
        
    }
}
