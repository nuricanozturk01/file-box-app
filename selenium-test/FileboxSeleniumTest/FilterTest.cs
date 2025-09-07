using OpenQA.Selenium;

namespace FileboxSeleniumTest
{
    public class FilterTest : IClassFixture<WebDriver>
    {
        private readonly IWebDriver m_driver;
        private readonly By FILTER_MENU_ITEM = By.Id("filter-by");
        private readonly By FILTER_EXTENSION_MENU_ITEM = By.Id("filter-by-extension");
        private readonly By APPLY_FILTER_MENU_ITEM = By.LinkText("Apply Filter");


        public FilterTest(WebDriver driver)
        {
            m_driver = driver.m_webDriver;
        }





        /*
         * 
         * Filter Files By Extension and check it's extensions. 
         * 
         */
        [Fact]
        public void FilterByFileExtension_WithGivenFileExtensionAndFolderId_ShouldReturnEquals()
        {
            Util.Login(m_driver);

            Util.WaitUntil(m_driver, FILTER_MENU_ITEM);

            m_driver.FindElement(FILTER_MENU_ITEM).Click();
            Util.WaitUntil(m_driver, FILTER_EXTENSION_MENU_ITEM);
            m_driver.FindElement(FILTER_EXTENSION_MENU_ITEM).Click();
            m_driver.FindElement(FILTER_MENU_ITEM).Click();
            m_driver.FindElement(APPLY_FILTER_MENU_ITEM).Click();

            var files = Util.GetFiles(m_driver);

            var extensionList = files.Select(f => Path.GetExtension(f.name));

            Assert.True(extensionList.All(ex => ex == ".png"));
        }
    }
}