using OpenQA.Selenium;
using OpenQA.Selenium.Interactions;

namespace FileboxSeleniumTest
{
    public class DownloadTest : IClassFixture<WebDriver>
    {
        private readonly By TABLE_ITEM = By.Id("table");
        private readonly By DOWNLOADING_ITEM = By.Id("download-right-click-item-button");

        private readonly IWebDriver m_driver;

        public DownloadTest(WebDriver webDriver)
        {
            m_driver = webDriver.m_webDriver;
        }





        /*
         * 
         * Download File and check is exists or not. 
         * 
         */
        [Fact]
        public async Task DownloadFile_WithGivenFileId_ShouldReturnsEqualAsync()
        {
            Util.Login(m_driver);

            Util.WaitUntil(m_driver, TABLE_ITEM);

            var files = Util.GetFiles(m_driver);

            Util.WaitUntil(m_driver, TABLE_ITEM);

            var downloadingFile = files[new Random().Next(0, files.Count - 1)];

            // Action for right click
            Actions action = new Actions(m_driver);
            action.MoveToElement(downloadingFile.selectedWebElement).ContextClick().Build().Perform();

            m_driver.FindElement(DOWNLOADING_ITEM).Click();

            Util.WaitUntil(m_driver, TABLE_ITEM, 20);


            Util.WaitUntil(m_driver, TABLE_ITEM, 30);
            var downloadedFile = new FileInfo(Path.Combine("C:\\Users\\hp\\Downloads", downloadingFile.name));

            await Task.Delay(3000);

            Assert.NotNull(downloadedFile);
            Assert.Equal(downloadedFile.Name, downloadingFile.name);
        }
    }
}
