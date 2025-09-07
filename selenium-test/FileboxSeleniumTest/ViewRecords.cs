using OpenQA.Selenium;

namespace FileboxSeleniumTest
{
    public record FileView(string name, DateTime creationDate, double fileSize, string fileSizeUnit, IWebElement selectedWebElement);
    public record FolderView(string name, DateTime creationDate, IWebElement selectedWebElement);
}
