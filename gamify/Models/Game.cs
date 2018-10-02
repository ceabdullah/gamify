using System;
using System.Collections.Generic;

namespace gamify.Models
{
    public partial class Game
    {
        public int Id { get; set; }
        public string GameName { get; set; }
        public string GameImage { get; set; }
        public string GameUrl { get; set; }
        public string GameImageName { get; set; }
        public string GameImageType { get; set; }
    }
}
