using OpenQA.Selenium;
using OpenQA.Selenium.Interactions;

namespace FileboxSeleniumTest
{
    public class RenameTest : IClassFixture<WebDriver>
    {
        private readonly IWebDriver m_driver;
        private readonly By TABLE_ITEM = By.Id("table");
        private readonly By RENAME_RIGHT_CLICK_ITEM = By.Id("rename-right-click-item-button");
        private readonly By RENAME_FILE_INPUT = By.Id("rename-file-input");
        private readonly By RENAME_FILE_BUTTON = By.Id("rename-file-button");

        private readonly By RENAME_FOLDER_INPUT = By.Id("rename-folder-input");
        private readonly By RENAME_FOLDER_BUTTON = By.Id("rename-folder-button");


        public RenameTest(WebDriver driver)
        {
            m_driver = driver.m_webDriver;
        }





        /*
         * 
         * Rename File And confirm it's name is changed 
         * 
         */
        [Fact]
        public void A_RenameFile_WithGivenNewFileName_ShouldReturnsEqual()
        {
            var random = new Random();

            m_driver.FindElement(RENAME_FOLDER_INPUT).SendKeys(Keys.Escape);

            Util.WaitUntil(m_driver, TABLE_ITEM);

            // Files on the page
            var files = Util.GetFiles(m_driver);
            Util.WaitUntil(m_driver, TABLE_ITEM);

            //Selecting removing file
            var renamingFile = files[3];

            // decided new file name
            var newFileName = Path.GetFileNameWithoutExtension(Path.GetRandomFileName()) + Path.GetExtension(renamingFile.name);

            // Action for right click
            Actions action = new Actions(m_driver);
            action.MoveToElement(renamingFile.selectedWebElement).ContextClick().Build().Perform();


            m_driver.FindElement(RENAME_RIGHT_CLICK_ITEM).Click();
            m_driver.FindElement(RENAME_FILE_INPUT).SendKeys(newFileName);
            m_driver.FindElement(RENAME_FILE_BUTTON).Click();

            Util.WaitUntil(m_driver, TABLE_ITEM);

            var afterRenamingFileList = Util.GetFiles(m_driver);

            Util.WaitUntil(m_driver, TABLE_ITEM);

            Assert.Equal(files.Count, afterRenamingFileList.Count);
            Assert.DoesNotContain(afterRenamingFileList, f => f.name == renamingFile.name);
            Assert.Contains(afterRenamingFileList, f => f.name == newFileName);
        }





        /*
         * 
         * Rename Folder And confirm it's name is changed 
         * 
         */
        [Fact]
        public void B_RenameFolder_WithGivenNewFolderName_ShouldReturnsEqual()
        {
            var random = new Random();
            Util.Login(m_driver);

            Util.WaitUntil(m_driver, TABLE_ITEM);

            // Files on the page
            var folders = Util.GetFolders(m_driver);
            Util.WaitUntil(m_driver, TABLE_ITEM);

            //Selecting removing file
            var renamingFolder = folders[random.Next(0, folders.Count - 1)];

            // Action for right click
            Actions action = new Actions(m_driver);
            action.MoveToElement(renamingFolder.selectedWebElement).ContextClick().Build().Perform();

            var newFolderName = Guid.NewGuid().ToString();

            m_driver.FindElement(RENAME_RIGHT_CLICK_ITEM).Click();
            m_driver.FindElement(RENAME_FOLDER_INPUT).SendKeys(newFolderName);
            m_driver.FindElement(RENAME_FOLDER_BUTTON).Click();

            Util.WaitUntil(m_driver, TABLE_ITEM);

            var afterRenamingFolderList = Util.GetFolders(m_driver);

            Util.WaitUntil(m_driver, TABLE_ITEM);

            Assert.Equal(folders.Count, afterRenamingFolderList.Count);
            Assert.DoesNotContain(afterRenamingFolderList, f => f.name == renamingFolder.name);
            Assert.Contains(afterRenamingFolderList, f => f.name == newFolderName);
        }
    }
}
