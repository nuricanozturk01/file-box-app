using OpenQA.Selenium;

namespace FileboxSeleniumTest
{
    public class SortFileTest : IClassFixture<WebDriver>
    {
        private readonly IWebDriver m_driver;

        private readonly By SORT_BY_ITEM = By.Id("sort-by");
        private readonly By SORT_FILE_SIZE_ITEM = By.Id("sort-file_size");
        private readonly By SORT_DATE_ITEM = By.Id("sort-date");

        public SortFileTest(WebDriver driver)
        {
            m_driver = driver.m_webDriver;
        }

        /*
         * 
         * Sort Files by File Size and check it
         * 
         */
        [Fact]
        public void SortFileByFileSize_WithGivenFolderId_ShouldReturnTrue()
        {
            Util.WaitUntil(m_driver, SORT_BY_ITEM);

            m_driver.FindElement(SORT_BY_ITEM).Click();
            m_driver.FindElement(SORT_FILE_SIZE_ITEM).Click();


            var files = Util.GetFiles(m_driver);


            var mbList = new List<double>();
            var gbList = new List<double>();
            var byteList = new List<double>();
            var kbList = new List<double>();

            files.ForEach(f =>
            {
                if (f.fileSizeUnit == "MB") mbList.Add(f.fileSize);
                if (f.fileSizeUnit == "KB") kbList.Add(f.fileSize);
                if (f.fileSizeUnit == "GB") gbList.Add(f.fileSize);
                if (f.fileSizeUnit == "Bytes") byteList.Add(f.fileSize);
            });

            var flag = true;

            if (mbList is not null && mbList.Count != 0)
                flag = CompareNumbers(mbList);

            if (gbList is not null && gbList.Count != 0)
                flag = CompareNumbers(gbList);

            if (kbList is not null && kbList.Count != 0)
                flag = CompareNumbers(kbList);

            if (byteList is not null && byteList.Count != 0)
                flag = CompareNumbers(byteList);

            Assert.True(flag);
        }





        /*
         * 
         * Sort Files by Creation Date and check it
         * 
         */
        [Fact]
        public void SortFileByCreationDate_WithGivenFolderId_ShouldReturnTrue()
        {
            Util.Login(m_driver);

            Util.WaitUntil(m_driver, SORT_BY_ITEM);

            m_driver.FindElement(SORT_BY_ITEM).Click();
            m_driver.FindElement(SORT_DATE_ITEM).Click();

            var files = Util.GetFiles(m_driver);

            Util.WaitUntil(m_driver, SORT_BY_ITEM);

            var dateList = files.Select(f => f.creationDate).ToList();

            Assert.True(dateList.Zip(dateList.Skip(1), (f, s) => Comparer<DateTime>.Default.Compare(f, s) <= 0).All(d => d));
        }





        private bool CompareNumbers(List<double> list)
        {
            for (var i = 0; i < list.Count - 1; ++i)
                if (list[i] < list[i + 1])
                    return false;

            return true;
        }
    }
}
