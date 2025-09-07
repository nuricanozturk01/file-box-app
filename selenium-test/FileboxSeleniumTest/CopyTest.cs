using OpenQA.Selenium;
using OpenQA.Selenium.Interactions;

namespace FileboxSeleniumTest
{
    public class CopyTest : IClassFixture<WebDriver>
    {
        private readonly By TABLE_ID = By.Id("table");
        private readonly By COPY_RIGHT_CLICK_BUTTON = By.Id("copy-right-click-item-button");
        private readonly By PASTE_RIGHT_CLICK_BUTTON = By.Id("paste-right-click-item-button");

        private readonly IWebDriver m_driver;

        public CopyTest(WebDriver driver)
        {
            m_driver = driver.m_webDriver;
        }






        /*
         * 
         * Copy File to Another folder and check folder has file. 
         * 
         */
        [Fact]
        public void CopyFile_WithGivenFolderId_ShouldReturnsEqualAndTrue()
        {
            var random = new Random();
            Util.Login(m_driver);

            Util.WaitUntil(m_driver, TABLE_ID);

            // Files on the page
            var files = Util.GetFiles(m_driver);
            Util.WaitUntil(m_driver, TABLE_ID);
            var folders = Util.GetFolders(m_driver);
            Util.WaitUntil(m_driver, TABLE_ID);
            //Selecting removing file

            var copyingFile = files[random.Next(0, files.Count - 1)];
            var copiedFolder = folders[0];

            // Action for right click
            Actions action = new Actions(m_driver);
            action.MoveToElement(copyingFile.selectedWebElement).ContextClick().Build().Perform();

            // Copied selected item
            m_driver.FindElement(COPY_RIGHT_CLICK_BUTTON).Click();
            copiedFolder.selectedWebElement.Click();
            Util.WaitUntil(m_driver, TABLE_ID);
            var filesOnFolder = Util.GetFiles(m_driver);

            Util.WaitUntil(m_driver, TABLE_ID);

            action.MoveToElement(filesOnFolder[0].selectedWebElement).ContextClick().Build().Perform();

            m_driver.FindElement(PASTE_RIGHT_CLICK_BUTTON).Click();
            Util.WaitUntil(m_driver, TABLE_ID);

            var afterCopiedFileList = Util.GetFiles(m_driver);

            Util.WaitUntil(m_driver, TABLE_ID);
            var homePageFiles = Util.GetFiles(m_driver);

            Assert.Contains(homePageFiles, f => f.name == copyingFile.name);
            Assert.Contains(afterCopiedFileList, f => f.name == copyingFile.name);
        }
    }
}
