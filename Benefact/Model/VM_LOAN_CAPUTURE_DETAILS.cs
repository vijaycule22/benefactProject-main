using System.Text.Json.Serialization;

namespace BenefactServer.Model
{
    public class VM_LOAN_CAPUTURE_DETAILS
    {
        [JsonPropertyName("EMPLOYEE_ID")]
        public string? EMPLOYEE_ID { set; get; }
        [JsonPropertyName("AMOUNT")]
        public int AMOUNT { set; get; }
        [JsonPropertyName("TENURE")]
        public int TENURE { set; get; }
        [JsonPropertyName("RATEOFINTEREST")]
        public int RATEOFINTEREST { set; get; }
        [JsonPropertyName("SURETYMEMBER")]
        public string? SURETYMEMBER { set; get; }
        [JsonPropertyName("TRACKING_STATUS")]
        public int TRACKING_STATUS { set; get; }
        [JsonPropertyName("TO_MAILID")]
        public string? TO_MAILID { set; get; }
        [JsonPropertyName("FROM_MAILID")]
        public string? FROM_MAILID { set; get; }
        [JsonPropertyName("CC_MAILID")]
        public string? CC_MAILID { set; get; }
        [JsonPropertyName("SUBJECT_TEXT")]
        public string? SUBJECT_TEXT { set; get; }
        [JsonPropertyName("APPROVE_STATUS")]
        public int APPROVE_STATUS { set; get; }


    }
}
