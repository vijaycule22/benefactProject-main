using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BenefactServer.Model
{
    public class MT_USER_INFO
    {
        [JsonPropertyName("EMPLOYEE_ID")]
        public string? EMPLOYEE_ID { get; set; }
        [JsonPropertyName("FIRST_NAME")]
        public string? FIRST_NAME { get; set; }
        [JsonPropertyName("LAST_NAME")]
        public string? LAST_NAME { get; set; }
        [JsonPropertyName("DOJ")]
        public DateTime? DOJ { get; set; }       
        [JsonPropertyName("PASSHASH")]        
        public string? PASSHASH { get; set; }
        [JsonPropertyName("USER_TYPE")]
        public int USER_TYPE { get; set; }
        [JsonPropertyName("EMAIL")]
        public string? EMAIL { get; set; }
        [JsonPropertyName("MOBILE_NUMBER")]
        public string? MOBILE_NUMBER { get; set; }       

    }
}
