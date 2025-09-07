using OpenQA.Selenium;
using OpenQA.Selenium.Interactions;

namespace FileboxSeleniumTest
{
    public class RemoveFileTest : IClassFixture<WebDriver>
    {
        private readonly IWebDriver m_driver;
        private readonly By TABLE_ITEM = By.Id("table");
        private readonly By REMOVE_RIGHT_CLICK_ITEM = By.Id("remove-right-click-item-button");
        public RemoveFileTest(WebDriver driver)
        {
            m_driver = driver.m_webDriver;
        }





        /*
         * 
         * Remove File And confirm it removed 
         * 
         */
        [Fact]
        public void RemoveFile_WithGivenFileIdAndUserId_ShouldReturnEqual()
        {
            var random = new Random();
            //Login
            Util.Login(m_driver);

            Util.WaitUntil(m_driver, TABLE_ITEM);

            // Files on the page
            var files = Util.GetFiles(m_driver);

            Util.WaitUntil(m_driver, TABLE_ITEM);

            //Selecting removing file
            var removingFile = files[random.Next(0, files.Count - 1)];

            Util.WaitUntil(m_driver, TABLE_ITEM);

            // Action for right click
            Actions action = new Actions(m_driver);
            action.MoveToElement(removingFile.selectedWebElement).ContextClick().Build().Perform();

            // CLick on the remove on context menu(Right click)
            m_driver.FindElement(REMOVE_RIGHT_CLICK_ITEM).Click();

            Util.WaitUntil(m_driver, TABLE_ITEM);

            var afterRemoveFiles = Util.GetFiles(m_driver);

            Util.WaitUntil(m_driver, TABLE_ITEM);

            Assert.NotEqual(files.Count, afterRemoveFiles.Count);
            Assert.Equal(files.Count - 1, afterRemoveFiles.Count);
            Assert.True(!afterRemoveFiles.Contains(removingFile));
        }



        /*
         * 
         * Remove Folder And confirm it removed 
         * 
         */
        [Fact]
        public void RemoveFolder_WithGivenFolderIdAndUserId_ShouldReturnEqual()
        {
            var random = new Random();
            // Login

            Util.WaitUntil(m_driver, TABLE_ITEM);

            // Files on the page
            var folders = Util.GetFolders(m_driver);
            Util.WaitUntil(m_driver, TABLE_ITEM);
            //Selecting removing file
            var removingFolder = folders[random.Next(0, folders.Count - 1)];

            Util.WaitUntil(m_driver, TABLE_ITEM);

            // Action for right click
            Actions action = new Actions(m_driver);
            action.MoveToElement(removingFolder.selectedWebElement).ContextClick().Build().Perform();

            m_driver.FindElement(REMOVE_RIGHT_CLICK_ITEM).Click();
            m_driver.Navigate().Refresh();

            Util.WaitUntil(m_driver, TABLE_ITEM);

            var afterRemoveFolders = Util.GetFolders(m_driver);
            Util.WaitUntil(m_driver, TABLE_ITEM);
            Assert.NotEqual(folders.Count, afterRemoveFolders.Count);
            Assert.True(!afterRemoveFolders.Contains(removingFolder));
        }
    }
}
