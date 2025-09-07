using OpenQA.Selenium;
using OpenQA.Selenium.Interactions;

namespace FileboxSeleniumTest
{
    public class CutTest : IClassFixture<WebDriver>
    {
        private readonly IWebDriver m_driver;
        private readonly By TABLE_ID = By.Id("table");
        private readonly By CUT_RIGHT_CLICK_BUTTON = By.Id("cut-right-click-item-button");
        private readonly By PASTE_RIGHT_CLICK_BUTTON = By.Id("paste-right-click-item-button");
        private readonly string HOME_PAGE = "http://localhost:3000/home";



        public CutTest(WebDriver driver)
        {
            m_driver = driver.m_webDriver;
        }



        /*
         * 
         * Cut file and move to another folder also check is file exists or not 
         * 
         */
        [Fact]
        public void MoveFile_WithGivenFolderId_ShouldReturnsEqualAndTrue()
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
            var movedFile = files[random.Next(0, files.Count - 1)];
            var movedFolder = folders[1];

            // Action for right click
            Actions action = new Actions(m_driver);
            action.MoveToElement(movedFile.selectedWebElement).ContextClick().Build().Perform();

            // Find Cut and click it
            m_driver.FindElement(CUT_RIGHT_CLICK_BUTTON).Click();
            movedFolder.selectedWebElement.Click();

            var filesOnFolder = Util.GetFiles(m_driver);

            //Right Click and click on the paste menu item
            action.MoveToElement(filesOnFolder[0].selectedWebElement).ContextClick().Build().Perform();
            m_driver.FindElement(PASTE_RIGHT_CLICK_BUTTON).Click();

            Util.WaitUntil(m_driver, TABLE_ID);

            var afterMovedFileList = Util.GetFiles(m_driver);
            //Refresh page
            m_driver.Navigate().GoToUrl(HOME_PAGE);

            Util.WaitUntil(m_driver, TABLE_ID);

            // Get Files on refreshing page
            var homePageFiles = Util.GetFiles(m_driver);

            Util.WaitUntil(m_driver, TABLE_ID);

            Assert.DoesNotContain(homePageFiles, f => f.name == movedFile.name);
            Assert.Contains(afterMovedFileList, f => f.name == movedFile.name);
        }
    }
}
