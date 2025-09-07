using OpenQA.Selenium;
using OpenQA.Selenium.Edge;

namespace FileboxSeleniumTest
{
    public class WebDriver : IDisposable
    {
        public readonly IWebDriver m_webDriver;

        private readonly string HOME_PAGE = "http://localhost:3000/";

        public WebDriver()
        {
            m_webDriver = new EdgeDriver();
            m_webDriver.Navigate().GoToUrl(HOME_PAGE);

        }

        public void Dispose()
        {
            m_webDriver.Dispose();
            m_webDriver.Quit();
        }
    }
}
