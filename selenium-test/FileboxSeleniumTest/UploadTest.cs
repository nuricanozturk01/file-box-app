using OpenQA.Selenium;

namespace FileboxSeleniumTest
{
    public class UploadTest : IClassFixture<WebDriver>
    {
        private readonly IWebDriver m_driver;
        private readonly By UPLOAD_FILE_ITEM = By.Id("upload-file");
        private readonly By UPLOAD_FILE_CHOOSE_FILE_ITEM = By.Id("upload-file-options-navbar");
        private readonly By UPLOAD_FILE_BUTTON_ITEM = By.Id("upload-file-button");
        private readonly By TABLE_ITEM = By.Id("table");

        private readonly string HOME_PAGE = "http://localhost:3000/home";
        public UploadTest(WebDriver driver)
        {
            m_driver = driver.m_webDriver;
        }






        /*
         * 
         * Upload File and check is it exists or not.
         * 
         */
        [Fact]
        public void UploadFile_WithGivenFolderId_ShouldReturnsEqualAndTrue()
        {
            var random = new Random();

            Util.Login(m_driver);

            Util.WaitUntil(m_driver, UPLOAD_FILE_ITEM);

            m_driver.FindElement(UPLOAD_FILE_ITEM).Click();
            m_driver.FindElement(UPLOAD_FILE_CHOOSE_FILE_ITEM).SendKeys("C:\\Users\\hp\\Downloads\\Notes.docx");
            Util.WaitUntil(m_driver, TABLE_ITEM);
            m_driver.FindElement(UPLOAD_FILE_BUTTON_ITEM).Click();

            Util.WaitUntil(m_driver, TABLE_ITEM, 90);

            m_driver.Navigate().GoToUrl(HOME_PAGE);

            Util.WaitUntil(m_driver, TABLE_ITEM);

            var filesOnRootPath = Util.GetFiles(m_driver);

            Task.Delay(3000).Wait();
            Assert.Contains(filesOnRootPath, f => f.name == "Notes.docx");
        }
    }
}