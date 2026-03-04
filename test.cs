using System;
using System.IO;
using System.Text.Json;

class Program
{
    static void Main()
    {
        string[] files = { "sdki.json", "slki.json", "siki.json" };
        foreach (var file in files)
        {
            try
            {
                string text = File.ReadAllText("data/" + file);
                JsonDocument.Parse(text);
                Console.WriteLine(file + " is valid");
            }
            catch (Exception ex)
            {
                Console.WriteLine(file + " is INVALID: " + ex.Message);
            }
        }
    }
}
