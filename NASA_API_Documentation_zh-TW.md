# NASA API 文件

## 目錄

-   [身份驗證與速率限制](#身份驗證與速率限制)
-   [APOD - 每日天文圖片](#apod---每日天文圖片)
-   [Asteroids NeoWs - 近地天體網路服務](#asteroids-neows---近地天體網路服務)
-   [DONKI - 太空天氣資料庫](#donki---太空天氣資料庫)
-   [EONET - 地球觀測自然事件追蹤器](#eonet---地球觀測自然事件追蹤器)
-   [EPIC - 地球多色成像相機](#epic---地球多色成像相機)
-   [系外行星檔案館](#系外行星檔案館)
-   [GIBS - 全球影像瀏覽服務](#gibs---全球影像瀏覽服務)
-   [InSight - 火星天氣服務](#insight---火星天氣服務)
-   [NASA 影像和視頻庫](#nasa-影像和視頻庫)
-   [開放科學資料存儲庫](#開放科學資料存儲庫)
-   [衛星狀況中心](#衛星狀況中心)
-   [SSD/CNEOS - 太陽系動力學](#ssdcneos---太陽系動力學)
-   [TechPort](#techport)
-   [技術轉移](#技術轉移)https://www.youtube.com/watch?v=6tZWt5RfeBo
-   [TLE API](#tle-api)
-   [Trek WMTS](#trek-wmts)

---

## 身份驗證與速率限制

### 身份驗證

您無需進行身份驗證即可探索 NASA 資料。但是，如果您將大量使用這些 API，例如支援移動應用程式，那麼您應該申請 NASA 開發者金鑰。

### 網路服務速率限制

對您使用 API 金鑰進行的 API 請求數量有限制。速率限制可能因服務而異，但預設值為：

-   **每小時限制：** 每小時 1,000 個請求

對於每個 API 金鑰，這些限制適用於所有 api.nasa.gov API 請求。超過這些限制將導致您的 API 金鑰暫時被阻止進行進一步請求。阻止將在等待一小時後自動解除。如果您需要更高的速率限制，請聯繫我們。

### DEMO_KEY 速率限制

在文件範例中，使用了特殊的 DEMO_KEY api 金鑰。此 API 金鑰可用於在註冊之前初步探索 API，但它的速率限制要低得多，因此如果您打算使用 API，建議您註冊自己的 API 金鑰（註冊快速且簡單）。DEMO_KEY 的速率限制為：

-   **每小時限制：** 每個 IP 地址每小時 30 個請求
-   **每日限制：** 每個 IP 地址每天 50 個請求

### 如何查看我當前的使用情況？

您可以通過檢查每個 API 響應中返回的 `X-RateLimit-Limit` 和 `X-RateLimit-Remaining` HTTP 標頭來檢查當前的速率限制和使用詳情。例如，如果一個 API 有預設的每小時 1,000 個請求限制，在進行 2 個請求後，您將在第二個請求的響應中收到此 HTTP 標頭：

```
X-RateLimit-Remaining: 998
```

您的 API 金鑰的每小時計數器以滾動方式重置。

**範例：** 如果您在上午 10:15 進行了 500 個請求，在上午 10:25 進行了 500 個請求，您的 API 金鑰將被暫時阻止。您的 API 金鑰的暫時阻止將在上午 11:15 停止，此時您可以進行 500 個請求。在上午 11:25，您可以再進行另外 500 個請求。

任何人都可以註冊 api.nasa.gov 金鑰，該金鑰可用於存取聯邦機構的資料。

---

## APOD - 每日天文圖片

⚠️ **服務中斷通知：** 此 API 目前正在經歷計劃外的中斷。我們正在努力盡快解決問題。對於任何不便，我們深表歉意。

NASA 最受歡迎的網站之一是每日天文圖片。實際上，這個網站是所有聯邦機構中最受歡迎的網站之一。它具有賈斯汀比伯視頻的流行吸引力。此端點構造 APOD 影像和相關元資料，以便可以將其重新用於其他應用程式。此外，如果 concept_tags 參數設置為 True，則返回從圖像說明派生的關鍵字。這些關鍵字可以用作 twitter 或 instagram 提要的自動生成主題標籤；但通常有助於發現相關影像。

此 API 的完整文件可在 [APOD API Github 存儲庫](https://github.com/nasa/apod-api) 中找到。

### HTTP 請求

```
GET https://api.nasa.gov/planetary/apod
```

**註記：** `concept_tags` 現在在此服務中已停用。此外，如果圖像不是公共領域，則返回可選的返回參數 `copyright`。

### 查詢參數

| 參數         | 類型       | 預設值   | 描述                                                                                         |
| ------------ | ---------- | -------- | -------------------------------------------------------------------------------------------- |
| `date`       | YYYY-MM-DD | today    | 要檢索的 APOD 圖像的日期                                                                     |
| `start_date` | YYYY-MM-DD | none     | 日期範圍的開始，當請求日期範圍時。不能與 date 一起使用。                                     |
| `end_date`   | YYYY-MM-DD | today    | 與 start_date 一起使用時的日期範圍結束。                                                     |
| `count`      | int        | none     | 如果指定了此項，則將返回隨機選擇的圖像數量。不能與 date 或 start_date 和 end_date 一起使用。 |
| `thumbs`     | bool       | False    | 返回視頻縮略圖的 URL。如果 APOD 不是視頻，則忽略此參數。                                     |
| `api_key`    | string     | DEMO_KEY | api.nasa.gov 金鑰用於擴展使用                                                                |

### 範例查詢

```
https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY
```

---

## Asteroids NeoWs - 近地天體網路服務

NeoWs（近地天體網路服務）是一個用於近地小行星資訊的 RESTful 網路服務。使用 NeoWs，用戶可以：根據小行星最接近地球的日期搜尋小行星，使用其 NASA JPL 小天體 ID 查找特定小行星，以及瀏覽整體資料集。

**資料集：** 所有資料均來自 NASA JPL 小行星團隊 (http://neo.jpl.nasa.gov/)。

此 API 由 SpaceRocks 團隊維護：David Greenfield、Arezu Sarvestani、Jason English 和 Peter Baunach。

### 近地天體 - 摘要

根據小行星最接近地球的日期檢索小行星清單。

```
GET https://api.nasa.gov/neo/rest/v1/feed?start_date=START_DATE&end_date=END_DATE&api_key=API_KEY
```

#### 查詢參數

| 參數         | 類型       | 預設值             | 描述                          |
| ------------ | ---------- | ------------------ | ----------------------------- |
| `start_date` | YYYY-MM-DD | none               | 小行星搜尋的開始日期          |
| `end_date`   | YYYY-MM-DD | start_date 後 7 天 | 小行星搜尋的結束日期          |
| `api_key`    | string     | DEMO_KEY           | api.nasa.gov 金鑰用於擴展使用 |

#### 範例查詢

```
https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=DEMO_KEY
```

### 近地天體 - 查找

根據其 NASA JPL 小天體 (SPK-ID) ID 查找特定小行星

```
GET https://api.nasa.gov/neo/rest/v1/neo/
```

#### 路徑參數

| 參數          | 類型   | 預設值   | 描述                                 |
| ------------- | ------ | -------- | ------------------------------------ |
| `asteroid_id` | int    | none     | 小行星 SPK-ID 與 NASA JPL 小天體相關 |
| `api_key`     | string | DEMO_KEY | api.nasa.gov 金鑰用於擴展使用        |

#### 範例查詢

```
https://api.nasa.gov/neo/rest/v1/neo/3542519?api_key=DEMO_KEY
```

### 近地天體 - 瀏覽

瀏覽整體小行星資料集

```
GET https://api.nasa.gov/neo/rest/v1/neo/browse/
```

#### 範例查詢

```
https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY
```

---

## DONKI - 太空天氣資料庫

太空天氣通知、知識、資訊資料庫 (DONKI) 是一個為太空天氣預報員、科學家和一般太空科學社區提供的綜合線上工具。DONKI 記錄了太空天氣研究中心 (SWRC) 提供的太空天氣觀測、分析、模型、預測和通知的每日解釋，全面的知識庫搜尋功能以支援異常解決和太空科學研究，太空天氣活動之間的智能聯繫、關係、因果效應，以及對 DONKI 中儲存資訊的全面網路服務 API 存取。

### API 組件

| API                     | 範例                                                                                                                                                       |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 日冕物質拋射 (CME)      | `https://api.nasa.gov/DONKI/CME?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=DEMO_KEY`                                                                  |
| 日冕物質拋射 (CME) 分析 | `https://api.nasa.gov/DONKI/CMEAnalysis?startDate=2016-09-01&endDate=2016-09-30&mostAccurateOnly=true&speed=500&halfAngle=30&catalog=ALL&api_key=DEMO_KEY` |
| 地磁風暴 (GST)          | `https://api.nasa.gov/DONKI/GST?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=DEMO_KEY`                                                                  |
| 行星際震波 (IPS)        | `https://api.nasa.gov/DONKI/IPS?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&location=LOCATION&catalog=CATALOG&api_key=DEMO_KEY`                                |
| 太陽閃焰 (FLR)          | `https://api.nasa.gov/DONKI/FLR?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=DEMO_KEY`                                                                  |
| 太陽高能粒子 (SEP)      | `https://api.nasa.gov/DONKI/SEP?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=DEMO_KEY`                                                                  |
| 磁層頂穿越 (MPC)        | `https://api.nasa.gov/DONKI/MPC?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=DEMO_KEY`                                                                  |
| 輻射帶增強 (RBE)        | `https://api.nasa.gov/DONKI/RBE?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=DEMO_KEY`                                                                  |
| 高速流 (HSS)            | `https://api.nasa.gov/DONKI/HSS?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=DEMO_KEY`                                                                  |
| WSA+Enlil 模擬          | `https://api.nasa.gov/DONKI/WSAEnlilSimulations?startDate=2016-01-06&endDate=2016-01-06&api_key=DEMO_KEY`                                                  |
| 通知                    | `https://api.nasa.gov/DONKI/notifications?startDate=2014-05-01&endDate=2014-05-08&type=all&api_key=DEMO_KEY`                                               |

### 預設參數

大多數 DONKI API 使用這些預設參數：

-   **startDate：** 預設為當前 UTC 日期之前 30 天
-   **endDate：** 預設為當前 UTC 日期

### 通知 API

參數：

-   `startDate` 和 `endDate` 格式為 'yyyy-MM-dd' UT
-   `type` 可以是：all、FLR、SEP、CME、IPS、MPC、GST、RBE、report

**註記：** 請求日期範圍限制為 30 天。如果請求範圍超過 30 天，它會將您的請求範圍限制為 (endDate-30) 到 endDate。

---

## EONET - 地球觀測自然事件追蹤器

越來越多的 NASA 影像通過網路服務（WMS、WMTS 等）提供，其中很大一部分正在近即時（NRT=獲取後幾小時內）製作和發布。這種能力意味著 NASA 影像可以更常規地用於檢查正在發生的當前自然事件。

地球觀測自然事件追蹤器 (EONET) 是一個原型網路服務，目標是：

-   提供持續更新的自然事件元資料的策劃來源
-   提供將這些自然事件連結到主題相關的網路服務啟用圖像來源的服務（例如，通過 WMS、WMTS 等）

EONET 的開發始於 2015 年，並得到了 NASA 地球觀測站和地球科學資料與資訊系統 (ESDIS) 項目的支援。

---

## EPIC - 地球多色成像相機

EPIC API 提供有關 DSCOVR 地球多色成像相機 (EPIC) 儀器每日收集的影像資訊。EPIC 位於地球-太陽拉格朗日點的獨特位置，使用 2048x2048 像素 CCD（電荷耦合器件）探測器結合 30 釐米孔徑卡塞格林望遠鏡，提供地球的全圓盤影像，並捕獲某些天文事件（如月球凌日）的獨特視角。

### 可檢索的元資料

集合中每個圖像都可獲得以下資訊：

-   圖像 [名稱]
-   日期
-   標題
-   質心座標
-   dscovr*j2000*位置
-   lunar*j2000*位置
-   sun*j2000*位置
-   姿態四元數

### 按日期查詢

| 參數                 | 類型       | 預設值         | 描述                                      |
| -------------------- | ---------- | -------------- | ----------------------------------------- |
| `natural`            | string     | 最近自然色彩   | 最近日期的自然色彩影像的元資料            |
| `natural/date`       | YYYY-MM-DD | 最近可用       | 給定日期可用的自然色彩影像的元資料        |
| `natural/all`        | string     | 自然色彩的日期 | 所有具有可用自然色彩影像的日期清單        |
| `natural/available`  | string     | 自然色彩的日期 | 所有具有可用自然色彩影像的日期的替代清單  |
| `enhanced`           | string     | 最近增強色彩   | 最近日期的增強色彩影像的元資料            |
| `enhanced/date`      | YYYY-MM-DD | 最近可用       | 給定日期的增強色彩影像的元資料            |
| `enhanced/all`       | string     | 增強影像的日期 | 所有具有可用增強色彩影像的日期清單        |
| `enhanced/available` | string     | 增強影像的日期 | 所有具有可用增強色彩影像的日期的替代清單  |
| `api_key`            | string     | DEMO_KEY       | 來自 api.nasa.gov 的 API 金鑰用於擴展使用 |

### 範例查詢

```
https://api.nasa.gov/EPIC/api/natural/images?api_key=DEMO_KEY
https://api.nasa.gov/EPIC/api/natural/date/2019-05-30?api_key=DEMO_KEY
https://api.nasa.gov/EPIC/api/natural/all?api_key=DEMO_KEY
https://api.nasa.gov/EPIC/archive/natural/2019/05/30/png/epic_1b_20190530011359.png?api_key=DEMO_KEY
```

---

## 系外行星檔案館

### 介紹

系外行星檔案館 API 允許程式化存取 NASA 的系外行星檔案館資料庫。此 API 包含大量選項，因此要開始使用，請訪問[此頁面](https://exoplanetarchive.ipac.caltech.edu/docs/program_interfaces.html)獲取介紹材料。要查看此 API 中可用的資料，請訪問[這裡](https://exoplanetarchive.ipac.caltech.edu/docs/API_queries.html)，並確保查看最佳實踐和故障排除，以防您遇到困難。祝您行星獵取愉快！

### 範例查詢

| 範例 API                                                | URL                                                                                                                                                                              |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 克卜勒領域中已確認的行星                                | `https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?&table=exoplanets&format=ipac&where=pl_kepflag=1`                                                       |
| 穿越其宿主恆星的已確認行星                              | `https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?&table=exoplanets&format=ipac&where=pl_tranflag=1`                                                      |
| 所有半徑小於 2Re 且平衡溫度在 180-303K 之間的行星候選者 | `https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=cumulative&where=koi_prad<2 and koi_teq>180 and koi_teq<303 and koi_disposition like 'CANDIDATE'` |

---

## GIBS - 全球影像瀏覽服務

NASA 的全球影像瀏覽服務 (GIBS) 旨在以高度響應的方式向用戶提供全球、全解析度的衛星影像，實現科學現象的視覺發現，支援自然災害的及時決策，教育下一代科學家，並使地球影像更容易被媒體和公眾獲得。

GIBS 提供對超過 1,000 種衛星影像產品的快速存取，覆蓋世界各地。大多數影像每日更新 - 在衛星觀測後幾小時內可用，一些產品涵蓋近 30 年。

### 存取機制

GIBS 通過四種機制提供存取：

1. 開放地理空間聯盟 (OGC) 網路地圖瓦片服務 (WMTS)，支援鍵值對和 RESTful 瓦片請求
2. OGC 網路地圖服務 (WMS)，支援鍵值對非瓦片請求
3. 瓦片網路地圖服務 (TWMS)，OGC WMS 的非官方擴展
4. 通過地理空間資料抽象庫 (GDAL) 的腳本級別存取

### 支援的投影

-   地理/等距圓柱 (EPSG:4326)
-   網路墨卡托 (EPSG:3857)
-   北極極球立體 (EPSG:3413)
-   南極極球立體 (EPSG:3031)

---

## InSight - 火星天氣服務

**⚠️ 由於 INSIGHT 需要管理電力使用，此服務有大量缺失資料**

NASA 的 InSight 火星著陸器在火星表面的極樂平原（一個靠近火星赤道的平坦光滑平原）持續進行天氣測量（溫度、風力、氣壓）。請注意，火星上的感應器有時會出現問題，導致資料缺失！

此 API 為最後七個可用的火星日（Martian Days）提供每日摘要資料。隨著來自特定火星日的更多資料從太空船下載（有時幾天後），這些值會重新計算，因此可能會隨著地球上接收到更多資料而改變。

### HTTP 請求

```
GET https://api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0
```

### 查詢參數

| 參數       | 類型   | 預設值   | 描述                                      |
| ---------- | ------ | -------- | ----------------------------------------- |
| `version`  | float  | 1.0      | 此 API 的版本                             |
| `feedtype` | string | json     | 返回的格式。目前預設為 JSON，僅 JSON 有效 |
| `api_key`  | string | DEMO_KEY | api.data.gov 金鑰用於擴展使用             |

### 範例查詢

```
https://api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0
```

此 API 的速率限制為每小時每個 IP 地址不超過 2000 次點擊。

---

## NASA 影像和視頻庫

使用此 API 存取位於 images.nasa.gov 的 NASA 影像和視頻庫網站。有關最新文件，請前往[這裡](https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf)。

images.nasa.gov API 圍繞 REST 組織，具有可預測的/面向資源的 URL，並使用 HTTP 響應代碼指示 API 錯誤。此 API 使用內建的 HTTP 功能，如 HTTP 身份驗證和 HTTP 動詞，這些功能被許多現成的 HTTP 用戶端理解。

### 可用端點

```
GET https://images-api.nasa.gov
```

| 端點                      | 描述                     |
| ------------------------- | ------------------------ |
| `GET /search?q={q}`       | 執行搜尋                 |
| `GET /asset/{nasa_id}`    | 檢索媒體資產的清單       |
| `GET /metadata/{nasa_id}` | 檢索媒體資產的元資料位置 |
| `GET /captions/{nasa_id}` | 檢索視頻資產的字幕位置   |

---

## 開放科學資料存儲庫

NASA OSDR 提供 RESTful 應用程式編程介面 (API) 來存取其全文搜尋、資料檔案檢索和元資料檢索功能。API 提供查詢結果的標準網路輸出格式選擇，包括 JavaScript 物件表示法 (JSON) 或超文本標記語言 (HTML)。

### 研究資料檔案 API

#### 語法

```
https://osdr.nasa.gov/osdr/data/osd/files/{OSD_STUDY_IDs}/?page={CURRENT_PAGE_NUMBER}&size={RESULTS_PER_PAGE}?all_files={ALL_FILES}
```

#### 參數

| 資料類型                | 註記       | 值                                            | 必需 |
| ----------------------- | ---------- | --------------------------------------------- | ---- |
| `{OSD_STUDY_IDs}`       | 整數或小數 | 單個 OSD 登錄號和範圍的混合逗號分隔清單       | 是   |
| `{CURRENT_PAGE_NUMBER}` | 整數       | 分頁中的當前頁碼                              | 否   |
| `{RESULTS_PER_PAGE}`    | 整數       | 分頁中每頁返回的結果數（最多 25）             | 否   |
| `{ALL_FILES}`           | 布林值     | 包含隱藏檔案。true 包含不可見檔案；false 排除 | 否   |

### 範例請求

```
https://osdr.nasa.gov/osdr/data/osd/files/87
https://osdr.nasa.gov/osdr/data/osd/files/137,87-95,13,20-50
```

### 研究元資料 API

#### 語法

```
https://osdr.nasa.gov/osdr/data/osd/meta/{OSD_STUDY_ID}
```

### 研究資料集搜尋 API

#### 語法 1 (JSON 響應)

```
https://osdr.nasa.gov/osdr/data/search?<PARAMETER-LIST>
```

#### 語法 2 (HTML 響應)

```
https://osdr.nasa.gov/bio/repo/search?q=<SEARCH-TERMS>&data_source=<DATA-SOURCE>
```

### 使用 Python 進行 API 請求

對於基本 API 請求，可以使用 `requests` python 庫：

```bash
pip install requests
```

```python
import requests
response = requests.get("API_ENDPOINT_HERE").json()
# 範例:
response = requests.get("https://osdr.nasa.gov/osdr/data/osd/files/87").json()
```

---

## 衛星狀況中心

衛星狀況中心網路 (SSCWeb) 服務由 NASA/GSFC 太空物理資料設施 (SPDF) 和國家太空科學資料中心 (NSSDC) 聯合開發和運營，以支援一系列 NASA 科學計劃並履行關鍵的國際 NASA 職責。

SSCWeb 的軟體和相關資料庫共同形成一個系統，將地心太空船位置資訊投射到（經驗）地球物理區域框架和太空船位置沿地球磁場線的映射中。

---

## SSD/CNEOS - 太陽系動力學

歡迎來到 JPL 的 SSD（太陽系動力學）和 CNEOS（近地天體研究中心）API 服務。此服務提供與 SSD 和 CNEOS 相關的機器可讀資料（JSON 格式）介面。

### API 組件

| API          | 描述                                 |
| ------------ | ------------------------------------ |
| **CAD**      | 小行星和彗星過去和未來與行星的接近   |
| **火球**     | 美國政府感應器報告的火球大氣撞擊資料 |
| **任務設計** | 任務設計 - 小天體任務設計套件        |
| **NHATS**    | 人類可存取的近地天體資料             |
| **Scout**    | NEOCP 軌道、星曆和撞擊風險資料       |
| **Sentry**   | 近地天體地球撞擊風險評估資料         |

每個組件在 JPL SSD/CNEOS API 主網站上都有詳細的文件。

---

## TechPort

TechPort 是 NASA 的技術清單，展示 NASA 活躍和已完成技術項目的投資組合。TechPort 使整個機構的技術資訊可用，以促進合作和夥伴關係的機會，分析機構如何滿足任務需求，以及技術驅動因素的資料視覺化，從而實現關鍵決策。

NASA TechPort 系統提供 RESTful 網路服務 API，使技術項目資料可供其他系統和服務使用。此 API 可用於將 TechPort 資料匯出為 JSON 格式，進一步處理和分析。

---

## 技術轉移

NASA 的技術轉移計劃確保為探索和發現開發的創新廣泛提供給公眾。此端點提供結構化、可搜尋的開發者存取 NASA 的專利、軟體和技術分拆描述，這些描述已經過策劃以支援技術轉移。

### HTTP 請求

```
GET https://api.nasa.gov/techtransfer
```

### 查詢參數

| 參數            | 類型   | 預設值 | 描述                                               |
| --------------- | ------ | ------ | -------------------------------------------------- |
| `patent`        | string | None   | 返回與提供的字符串匹配的專利 JSON                  |
| `patent_issued` | string | None   | 返回 JSON 中與專利發布資訊中的字符串匹配的專利結果 |
| `software`      | string | None   | 返回與給定字符串匹配的 NASA 軟體 JSON              |
| `Spinoff`       | string | None   | 返回與給定詞匹配的分拆範例                         |

### 範例查詢

```
https://api.nasa.gov/techtransfer/patent/?engine&api_key=DEMO_KEY
```

---

## TLE API

TLE API 提供最新的雙行元素集記錄，資料每日從 CelesTrak 更新並以 JSON 格式提供。雙行元素集 (TLE) 是一種資料格式，編碼給定時間點地球軌道天體的軌道元素清單。

### 可用端點

```
GET http://tle.ivanstanojevic.me
```

| 端點                      | 描述                                  |
| ------------------------- | ------------------------------------- |
| `GET /api/tle?search={q}` | 按衛星名稱執行搜尋                    |
| `GET /api/tle/{q}`        | 檢索單個 TLE 記錄，其中查詢為衛星編號 |

### 範例查詢

```
http://tle.ivanstanojevic.me/api/tle
```

---

## Trek WMTS

這裡有為出色的火星探索和維斯塔探索 NASA 網路門戶提供支援的 API 集合，並新增加了月球探索。這些 API 可以使用您最喜歡的 OGC RESTFul 網路地圖和瓦片服務 (WMTS) 用戶端來利用。

### 基本 URL 範本

```
http://{WMTS endpoint}/1.0.0/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png
```

### 可用服務

-   **月球探索：** 完整清單可在 [https://trek.nasa.gov/tiles/apidoc/trekAPI.html?body=moon](https://trek.nasa.gov/tiles/apidoc/trekAPI.html?body=moon) 找到
-   **火星探索：** 各種鑲嵌圖，包括維京號彩色鑲嵌圖、CTX 鑲嵌圖、HiRISE 鑲嵌圖、HRSC 鑲嵌圖等
-   **維斯塔探索：** 全球 LAMO、DTM、地質、彩色陰影和其他專門鑲嵌圖

每個服務都提供 WMTS 功能 XML，用於詳細配置和使用資訊。

---

_本文件涵蓋了全面的 NASA API 生態系統。有關最新資訊和詳細範例，請訪問本文件中提供的各個 API 文件連結。_
