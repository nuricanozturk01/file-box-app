using OpenQA.Selenium;

namespace FileboxSeleniumTest
{
    public class CreateFolderTest : IClassFixture<WebDriver>
    {
        private readonly IWebDriver m_driver;

        private readonly string VALID_TEST_FOLDER_NAME = Path.GetFileNameWithoutExtension(Path.GetRandomFileName());
        private readonly string INVALID_TEST_FOLDER_NAME = "asdas/?*<>";

        private readonly By CREATE_FOLDER_MENU_ITEM = By.Id("create-folder");
        private readonly By CREATE_FOLDER_INPUT = By.Id("create-folder-input");
        private readonly By INVALID_CREATE_FOLDER_MESSAGE = By.Id("invalid-created-folder-name");
        private readonly By CREATE_FOLDER_BUTTON = By.Id("create-folder-button");

        public CreateFolderTest(WebDriver driver)
        {
            m_driver = driver.m_webDriver;
        }





        /*
         * 
         * Create Folder And check is exists 
         * 
         */
        [Fact]
        public void A_CreateFolder_WithGivenFolderName_ShouldReturnEquals()
        {

            Util.Login(m_driver);
            Util.WaitUntil(m_driver, CREATE_FOLDER_MENU_ITEM);

            m_driver.FindElement(CREATE_FOLDER_MENU_ITEM).Click();
            m_driver.FindElement(CREATE_FOLDER_INPUT).SendKeys(VALID_TEST_FOLDER_NAME);
            m_driver.FindElement(CREATE_FOLDER_BUTTON).Click();
            m_driver.FindElement(CREATE_FOLDER_INPUT).SendKeys(Keys.Escape);

            Util.WaitUntil(m_driver, CREATE_FOLDER_MENU_ITEM);

            var folders = Util.GetFolders(m_driver);
            Assert.Contains(folders, f => f.name == VALID_TEST_FOLDER_NAME);
        }




        /*
         * 
         * Create Folder With invalid characters and check the warning message 
         * 
         */
        [Fact]
        public void B_CreateFolder_WithGivenInvalidFolderName_ShouldReturnEquals()
        {
            Util.WaitUntil(m_driver, CREATE_FOLDER_MENU_ITEM);

            m_driver.FindElement(CREATE_FOLDER_MENU_ITEM).Click();
            m_driver.FindElement(CREATE_FOLDER_INPUT).SendKeys(INVALID_TEST_FOLDER_NAME);

            var expectedText = "You cannot enter the /\\*?<>:\"| characters!";
            var actualText = m_driver.FindElement(INVALID_CREATE_FOLDER_MESSAGE).Text;

            Assert.Equal(expectedText, actualText);
        }
    }
}