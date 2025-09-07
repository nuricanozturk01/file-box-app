using OpenQA.Selenium;

namespace FileboxSeleniumTest
{
    public class A_LoginTest : IClassFixture<WebDriver>
    {
        private readonly IWebDriver m_driver;

        private readonly By USERNAME_INPUT = By.Id("floatingInput");
        private readonly By PASSWORD_INPUT = By.Id("floatingPassword");
        private readonly By LOGIN_BUTTON = By.Id("login-button");

        private readonly string VALID_TEST_USERNAME = "nuricanozturk";
        private readonly string VALID_TEST_PASSWORD = "123";

        private readonly string INVALID_TEST_USERNAME = "yagmur";
        private readonly string INVALID_TEST_PASSWORD = "53124";
        private readonly string HOME_PAGE = "http://localhost:3000/";

        public A_LoginTest(WebDriver webDriver)
        {
            m_driver = webDriver.m_webDriver;
        }





        /*
         * 
         * Login Test. Expected result is fail!
         * 
         */
        [Fact]
        public void LoginTest_WithGivenInvalidUsernameAndPassword_ShouldReturnNotEqual()
        {
            var expectedText = "Please control the username and password";


            m_driver.FindElement(USERNAME_INPUT).SendKeys(INVALID_TEST_USERNAME);
            m_driver.FindElement(PASSWORD_INPUT).SendKeys(INVALID_TEST_PASSWORD);
            m_driver.FindElement(LOGIN_BUTTON).Click();
            Util.WaitNSecond(m_driver, 5);

            var text = m_driver.FindElement(By.Id("unsuccess-login")).Text;

            Assert.NotEmpty(text);
            Assert.Equal(expectedText, text);
        }





        /*
         * 
         * Login Test. Expected result is success!
         * 
         */
        [Fact]
        public void LoginTest_WithGivenUsernameAndPassword_ShouldReturnEqual()
        {
            m_driver.Navigate().GoToUrl(HOME_PAGE);
            var expectedText = "account: [nuricanozturk]";

            m_driver.FindElement(USERNAME_INPUT).SendKeys(VALID_TEST_USERNAME);
            m_driver.FindElement(PASSWORD_INPUT).SendKeys(VALID_TEST_PASSWORD);
            m_driver.FindElement(LOGIN_BUTTON).Click();

            Util.WaitNSecond(m_driver, 5);
            var text = m_driver.FindElement(By.Id("account-info")).Text;

            Assert.NotEmpty(text);
            Assert.Equal(expectedText, text);
        }
    }
}