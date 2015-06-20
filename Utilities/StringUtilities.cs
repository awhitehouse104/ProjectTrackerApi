using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace ProjectTrackerApi.Utilities
{
    public static class StringUtilities
    {
        public static string GenerateRandomString(int length)
        {
            var result = new StringBuilder();
            var allowedCharSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".ToArray();
            var byteSize = 256;

            using (var rng = new RNGCryptoServiceProvider())
            {
                var buf = new byte[128];

                while (result.Length < length)
                {
                    rng.GetBytes(buf);

                    for (var i = 0; i < buf.Length && result.Length < length; ++i)
                    {
                        var outOfRangeStart = byteSize - (byteSize % allowedCharSet.Length);
                        if (outOfRangeStart <= buf[i])
                        {
                            continue;
                        }
                        result.Append(allowedCharSet[buf[i] % allowedCharSet.Length]);
                    }
                }
            }

            return result.ToString();
        }

        public static string ToSaltedHash(this string password, string salt)
        {
            byte[] passwordBytes = Encoding.Unicode.GetBytes(password);
            byte[] saltBytes = Convert.FromBase64String(salt);

            var hashStrategy = HashAlgorithm.Create("HMACSHA256") as KeyedHashAlgorithm;
            if (hashStrategy.Key.Length == saltBytes.Length)
                hashStrategy.Key = saltBytes;
            else if (hashStrategy.Key.Length < saltBytes.Length)
            {
                var keyBytes = new byte[hashStrategy.Key.Length];
                Buffer.BlockCopy(saltBytes, 0, keyBytes, 0, keyBytes.Length);
                hashStrategy.Key = keyBytes;
            }
            else
            {
                var keyBytes = new byte[hashStrategy.Key.Length];
                for (int i = 0; i < keyBytes.Length; )
                {
                    int len = Math.Min(saltBytes.Length, keyBytes.Length - i);
                    Buffer.BlockCopy(saltBytes, 0, keyBytes, i, len);
                    i += len;
                }
                hashStrategy.Key = keyBytes;
            }
            byte[] result = hashStrategy.ComputeHash(passwordBytes);
            return Convert.ToBase64String(result);
        }
    }
}