namespace BenefactServer.Common
{
    public class AtParWebApiResponse<AtParData>
    {
        public WebEnums.StatusType StatType { get; set; }
        public long StatusCode { get; set; }
        public string StatusMessage { get; set; }
        public string ExceptionMessage { get; set; }
        public AtParData Data { get; set; }
        public IList<AtParData> DataList { get; set; }
        public object DataVariable { get; set; }
        public Dictionary<string, Object> DataDictionary { get; set; }
    }
}
