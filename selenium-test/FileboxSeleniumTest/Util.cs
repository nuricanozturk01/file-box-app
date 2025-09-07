using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using System.Globalization;
using System.Text.RegularExpressions;

namespace FileboxSeleniumTest
{
    internal static class Util
    {
        public static readonly By USERNAME_INPUT = By.Id("floatingInput");
        public static readonly By PASSWORD_INPUT = By.Id("floatingPassword");
        public static readonly By LOGIN_BUTTON = By.Id("login-button");

        public static readonly string VALID_TEST_USERNAME = "ahmetkoc";
        public static readonly string VALID_TEST_PASSWORD = "123";






        /*
         * 
         * Login method for other tests
         * 
         */
        public static void Login(IWebDriver m_driver)
        {
            m_driver.FindElement(USERNAME_INPUT).SendKeys(VALID_TEST_USERNAME);
            m_driver.FindElement(PASSWORD_INPUT).SendKeys(VALID_TEST_PASSWORD);
            m_driver.FindElement(LOGIN_BUTTON).Click();
        }






        /*
         * 
         * Create DateTime Object with given datetime string
         * 
         */
        private static DateTime GetDateTimeObjectByDateTimeString(string dateTimeString)
        {
            return DateTime.ParseExact(dateTimeString, "dd/MM/yyyy HH:mm:ss", CultureInfo.InvariantCulture, DateTimeStyles.None);
        }





        /*
         * 
         * Decompose file size string and convert it to xy.zt MB...
         * 
         */
        private static (double fileSize, string fileSizeUnit) GetFileSizeWithFileSizeUnit(string fileSizeString)
        {
            string pattern = @"(\d+\.\d+)\s*(MB|GB|Bytes|KB)";
            Match match = Regex.Match(fileSizeString, pattern);
            string extractedNumber = match.Groups[1].Value;
            string unit = match.Groups[2].Value;

            return (double.Parse(extractedNumber == "" ? "0" : extractedNumber), unit == "" ? "Bytes" : unit);
        }





        /*
         * 
         * Get Files from current table on the screen
         * 
         */
        public static List<FileView> GetFiles(IWebDriver driver)
        {
            var fileList = new List<FileView>();
            {
                WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(30));
                wait.Until(driver => driver.FindElement(By.Id("table")).Enabled);
            }
            var table = driver.FindElement(By.Id("table"));
            var files = table.FindElement(By.Id("table-body")).FindElements(By.Id("file-col"));

            foreach (var file in files)
            {
                var fileNameWebElement = file.FindElement(By.Id("file-name-label"));
                var fileName = fileNameWebElement.Text;
                var fileCreationDate = GetDateTimeObjectByDateTimeString(file.FindElement(By.Id("file-creation_date-ref")).Text);
                var fileSize = GetFileSizeWithFileSizeUnit(file.FindElement(By.Id("file-size-ref")).Text);

                fileList.Add(new FileView(fileName, fileCreationDate, fileSize.fileSize, fileSize.fileSizeUnit, fileNameWebElement));
            }

            return fileList;
        }





        /*
         * 
         * Wait until by webelement
         * 
         */
        public static void WaitUntil(IWebDriver driver, By element)
        {
            WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(30));
            wait.Until(driver => driver.FindElement(element).Enabled);
        }





        /*
         * 
         * Wait until by webelement with specific time
         * 
         */
        public static void WaitUntil(IWebDriver driver, By element, double time)
        {
            WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(time));
            wait.Until(driver => driver.FindElement(element).Enabled);
        }






        /*
         * 
         * Wait method but implicit
         * 
         */
        public static void WaitNSecond(IWebDriver driver, double time)
        {
            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(time);
        }






        /*
         * 
         * Get Folders from current table on the screen
         * 
         */
        public static List<FolderView> GetFolders(IWebDriver driver)
        {
            var folderList = new List<FolderView>();
            {
                WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(30));
                wait.Until(driver => driver.FindElement(By.Id("table")).Enabled);
            }
            var table = driver.FindElement(By.Id("table"));
            var folders = table.FindElement(By.Id("table-body")).FindElements(By.Id("folder-col"));

            foreach (var folder in folders)
            {
                var folderNameWebElement = folder.FindElement(By.Id("folder-name-label"));
                var folderName = folderNameWebElement.Text;
                var folderCreationDate = GetDateTimeObjectByDateTimeString(folder.FindElement(By.Id("folder-creation_date-ref")).Text);

                folderList.Add(new FolderView(folderName, folderCreationDate, folderNameWebElement));
            }
            return folderList;
        }
    }
}
