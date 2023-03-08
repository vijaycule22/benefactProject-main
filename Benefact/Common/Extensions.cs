using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Reflection;

namespace BenefactServer.Common
{
    public static class Extensions
    {
        public static T SqlQuery<T>(this DbContext db, string query)
        {
            object value = default(T);
            using (var command = db.Database.GetDbConnection().CreateCommand())
            {
                command.CommandText = query;
                command.CommandType = CommandType.Text;
                db.Database.OpenConnection();
                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        value = reader.GetValue(0);
                    }
                    return (T)Convert.ChangeType(value, typeof(T));
                }
            }
        }

        public static string RevertString(this string sb, bool pIsDbRelated = false)
        {
            sb = sb.Replace("'", "''");
            if (!pIsDbRelated)
            {
                sb = sb.Replace("$@PARLT@PAR$", "&lt;");
                sb = sb.Replace("$@PARGT@PAR$", "&gt;");
            }
            return sb;
        }

        public static List<T> ExecuteQuery<T>(this DbContext db, string query) where T : class, new()
        {
            using (var command = db.Database.GetDbConnection().CreateCommand())
            {
                command.CommandText = query;
                command.CommandType = CommandType.Text;

                db.Database.OpenConnection();

                using (var reader = command.ExecuteReader())
                {
                    var lst = new List<T>();
                    var lstColumns = new T().GetType().GetProperties(BindingFlags.DeclaredOnly | BindingFlags.Instance |
                        BindingFlags.Public | BindingFlags.NonPublic).ToList();
                    while (reader.Read())
                    {
                        var newObject = new T();
                        for (var i = 0; i < reader.FieldCount; i++)
                        {
                            var name = reader.GetName(i);
                            PropertyInfo prop = lstColumns.FirstOrDefault(a => a.Name.ToLower().Equals(name.ToLower()));
                            if (prop == null)
                            {
                                continue;
                            }
                            var val = reader.IsDBNull(i) ? null : reader[i];
                            prop.SetValue(newObject, val, null);
                        }
                        lst.Add(newObject);
                    }

                    return lst;
                }
            }
        }
    }
}
