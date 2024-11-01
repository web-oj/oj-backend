# Hướng dẫn sử dụng Online Judge Database

[TOC]

## Schema

**Tên CSDL**: OJDB.

**Lược đồ quan hệ**:

![Schema](schema.png)

### Ý nghĩa các bảng

#### Users

- Hệ thống lưu thông tin của nhiều người dùng, gồm các thông tin liên quan đến auth như username, pasword, và các thông tin cá nhân hồ sơ khác như mật khẩu, vai trò (admin `AD`, người tạo bài tập `PS` hoặc người dùng thường `CU`).
- Người dùng có một điểm rating thể hiện thành tích trên hệ thống của bản thân; điểm này thay đổi khi làm các contest.
- Người dùng có thể tham gia các kỳ thi nhỏ (`ContestParticipated`), giải các bài tập (`ProblemSolved`). Người dùng có thể hiện thành tích của bản thân lên hồ sơ để flex (`Achievements`).
- Người dùng sẽ nhận được thông báo hệ thống (`Notifications`).
- Người dùng có thể tham gia thảo luận dưới các bài tập (`DiscussionMessages`)

#### Contests

- Hệ thống tổ chức các kỳ thi nhỏ để người dùng tham dự. Mỗi kỳ thi gồm có tên, mô tả kỳ thi, thời gian bắt đầu và kết thúc, cách chấm điểm, người tạo kỳ thi. Kỳ thi có thể áp dụng tính năng nhận diện gian lận hoặc không. Kỳ thi có thể được lưu lại dưới dạng draft trước khi publish.
- Cách chấm điểm của kỳ thi có thể là "IOI" hoặc "ICPC"
- Một kỳ thi gồm có nhiều bài tập. Một bài tập có thể nằm trong nhiều kỳ thi (`ContestProblems`)

#### Problems

- Hệ thống có nhiều bài tập để người dùng giải. Một bài tập gồm có tên, đề bài, độ khó (dưới dạng số), giới hạn thời gian chạy, giới hạn bộ nhớ sử dụng, phương pháp xuất/nhập, người tạo. Một số bài tập có thể có lời giải. Bài tập có thể được lưu lại dưới dạng draft trước khi publish.
- Các bài tập sẽ được gắn tag để dễ tìm (`TaggedProblems`)
- Một kỳ thi gồm có nhiều bài tập. Một bài tập có thể nằm trong nhiều kỳ thi (`ContestProblems`)

#### Submissions

- Người dùng phải nộp một lời giải để giải một bài tập. Lời giải này được một người nộp, nộp cho một bài tập và trong một contest (Nếu lời giải được nộp ngoài thời gian contest, nó sẽ được coi là không chính thức). Lời giải gồm có thời gian nộp, ngôn ngữ lập trình, mã nguồn (có thể lưu tại file bên ngoài), trạng thái bài nộp và thông tin từ chương trình dịch.
- Trạng thái bài nộp nhận một trong các giá trị:
  - `AC`: lời giải đã chấm xong và được chấp nhận
  - `P`: lời giải đang được đợi để chấm
  - `J`: lời giải đang được chấm
  - `WA`: lời giải đã chấm xong và không được chấp nhận vì có một test cho kết quả khác đáp án
  - `TLE`: lời giải đã chấm xong và không được chấp nhận vì có một test chạy quá thời gian cho phép của bài tập
  - `MLE`: lời giải đã chấm xong và không được chấp nhận vì có một test sử dụng quá bộ nhớ cho phép của bài tập
  - `RTE`: lời giải đã chấm xong và không được chấp nhận vì có một test mà chương trình trả về giá trị khác `0` (chạy sinh lỗi)
  - `CE`: lời giải không dịch được bởi chương trình dịch và sẽ không được chấm
  - `D`: lời giải bị từ chối chấm (có thể do người dùng đã bị ban hoặc có một dữ liệu nào đó không hợp lệ)
- CSDL chỉ cho phép chèn một lời giải mới với trạng thái là `P` hoặc `CE`. Để có các trạng thái khác, phải sử dụng phép cập nhật hoặc đợi cho việc chấm bài hoàn tất trên tất cả các test.
- Một lời giải sẽ được chạy qua nhiều test case để có kết quả chi tiết (`SubmissionResults`)
- Lời giải có thể bị quét bởi thuật toán kiểm tra gian lận (`PlagiarismReports`)

#### TestCases

- Một bài tập có nhiều test case. Mỗi test case gồm một đầu vào, một đầu ra mong đợi, và có thể bị ẩn khỏi người dùng thường.

#### SubmissionResults

- Một lời giải phải chạy qua nhiều test case để có kết quả. Một bộ kết quả gồm thời gian chạy, lượng bộ nhớ sử dụng, đầu ra, thông tin từ máy chấm, trạng thái kết quả và thời gian chấm
- Trạng thái kết quả có thể là một trong các giá trị đã liệt kê tại `Submissions`
- Nếu chèn một bộ kết quả có trạng thái là `WA`, `TLE`, `MLE`, `RTE`, trạng thái tại bảng `Submissions` sẽ tự động được cập nhật thành các giá trị này. Sau khi chèn, nếu toàn bộ các test thuộc về một bài tập đều cho trạng thái `AC`, trạng thái ở bảng `Submissions` cũng tự động được chuyển thành `AC`.
- Bảng `SubmissionResults` không cho phép cập nhật kết quả của một bộ đã được chèn.

#### ContestProblems

- Một kỳ thi gồm nhiều bài toán. Mỗi bài toán có một trọng số điểm riêng (không quan trọng nếu format của kỳ thi là ICPC)

#### Tags

- Hệ thống lưu lại các tag để dễ phân loại các bài tập. Một tag gồm có tên tag, loại tag (nguồn bài `SOURCE` hay loại bài `CATEGORY`).
- Bảng `Tags` có thêm một thuộc tính nữa là `is_selected` để chọn các tag khi cần lọc bài tập theo tag (do MySQL không cho phép các hàm hay thủ tục có đầu vào đa trị)

#### Achievements

- Người dùng có thể flex thành tích lên hồ sơ. Một thành tích gồm có tên, tài liệu đính kèm, và một "tick xanh"

#### Notifications

- Hệ thống gửi thông báo cho người dùng. Thông báo gồm có nội dung và thời điểm gửi

#### DiscussionMessages

- Người dùng có thể soạn tin nhắn thảo luận dưới các bài toán. Tin nhắn thảo luận gồm có nội dung, thời gian gửi và tin nhắn cha (có thể không có)

#### PlagiarismReports

- Cần nghiên cứu thêm (API cho bảng này cũng chưa có luôn)

## Sử dụng schema

### Online hosting MySQL server

Host: `mysql-3f37b883-ojdb-test.f.aivencloud.com`
Port: `11192`
User: `testuser`
Password:
Database: `ojdb`

### Cài đặt Schema (local)

Cần phải tải MySQL server trước (bản nào cũng được).

Chạy `mysql` và đăng nhập để vào MySQL, sau đó truy vấn

```sql
SOURCE ./src/services/init.sql
```

Để có dữ liệu mẫu, chạy tiếp truy vấn

```sql
SOURCE ./src/services/sampledata.sql
```

## Database API

Tất cả hàm và truy vấn trên dữ liệu được thực hiện thông qua đối tượng `db` thuộc lớp `Database`. Để sử dụng đối tượng này, cần có một file `.env` tại repo root directory có dạng

```
MYSQL_HOST="host"
MYSQL_USER="user"
MYSQL_PASSWORD="password"
MYSQL_DATABASE="ojdb"
```

### Constructor

```ts
constructor(
    __host: string,
    __user: string,
    __password: string,
    __database: string,
  )
```

Khởi tạo đối tượng thuộc lớp `Database`, trong đó mở kết nối tới database server. Kết nối được tạo ra là một connection pool kích thước bằng 10, sử dụng framework `mysql2`.

#### Tham số

- `__host`: Database host
- `__user`: Database user
- `__password`: Mật khẩu cho user
- `__database`: Tên database

#### Chú ý

Khi import và gọi đối tượng `db`, nó đã được khởi tạo sẵn bằng hàm này với các tham số là các giá trị lưu trong `.env`.

### Hàm `queryAddProblem`

```ts
async queryAddProblem(
    title: string,
    statement: string,
    difficulty: number,
    timeLimit: number,
    memoryLimit: number,
    inputFormat: string | null,
    outputFormat: string | null,
    solutionText: string | null,
    creatorId: number,
    isPublished: boolean | null = false,
  ): Promise<boolean>
```

Thêm một bài toán vào CSDL.

#### Tham số

- `title`: Tên của bài toán
- `statement`: Đề bài và các miêu tả khác của bài toán
- `difficulty`: Một số nguyên mô tả độ khó của bài toán
- `timeLimit`: Giới hạn thời gian cho các lần nộp bài, tính bằng millisecond. Khi nộp bài, nếu bài nộp có thời gian chạy một test vượt quá giá trị này thì trạng thái kết quả sẽ là `TLE` (Time Limit Exceeded)
- `memoryLimit`: Giới hạn bộ nhớ cho các lần nộp bài, tính bằng kilobyte. Khi nộp bài, nếu bài nộp có bộ nhớ sử dụng để chạy một test vượt quá giá trị này thì trạng thái kết quả sẽ là `MLE` (Memory Limit Exceeded)
- `inputFormat`: Một xâu miêu tả cách mà code của người dùng nhận dữ liệu, từ màn hình console (stdin) hay từ một file input. Để là `null` để sử dụng input từ màn hình console, hoặc để là tên file nếu muốn input từ file đó.
- `outputFormat`: Một xâu miêu tả cách mà code của người dùng xuất dữ liệu ra, ra màn hình console (stdout) hay ra một file input. Để là `null` để sử dụng input từ màn hình console, hoặc để là tên file nếu muốn input từ file đó.
- `solutionText`: Một xâu miêu tả lời giải cho bài toán. Lời giải này có thể được viết dưới dạng Markdown. Có thể để `null` nếu không có lời giải
- `creatorId`: `userId` của người tạo bài tập này. Người tạo phải có role là Admin hoặc Problem Setter, nếu không sẽ gây lỗi
- `isPublished`: Giá trị boolean cho biết bài toán này đã được hoàn thiện để đăng lên chưa (dùng cho tính năng Save Draft). Để là `null` hoặc bỏ qua tham số này sẽ ngầm định `isPublished = 0`.

#### Giá trị trả về

Một `Promise`, khi hoàn thành sẽ trả về `true` nếu thành công. Nếu có lỗi, hàm này sẽ ném lại lỗi đó.

#### Chú ý

Sử dụng hàm này để thêm một bài tập vào CSDL, chẳng hạn:

````ts
db.queryAddProblem(
        "A cộng B",
        'Cho $2$ số nguyên $A$ và $B$. Hãy tính $A + B$.

## Input

Gồm $1$ dòng chứa $2$ số nguyên $A$ và $B$ $(1\\leq A\\leq B \\leq 1000)$, cách nhau bởi $1$ dấu cách.

## Output

Ghi ra tổng $A + B$.

## Sample input

```
3 4
```

## Sample output

```
7
```',
        800,
        1000,
        512,
        null,
        null,
        '```
#include <iostream>

using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    cout << a + b;
    return 0;
}
```'
````

sẽ cho ra một bài toán có đề bài là "A cộng B", nhận dữ liệu từ màn hình console, xuất ra màn hình console, độ khó là 800, giới hạn thời gian 1s, giới hạn bộ nhớ 512KB, và có đề bài và lời giải trong code (thử copy phần trên ra Markdown để xem chi tiết).

Về ID của bài toán mới, nó sẽ được tự tính thông qua MySQL `AUTO_INCREMENT`.

### Hàm `queryInsertProblem`

```ts
async queryEditProblemAttr(
    problemId: number,
    title: string | null = null,
    statement: string | null = null,
    difficulty: number | null = null,
    timeLimit: number | null = null,
    memoryLimit: number | null = null,
    inputFormat: string | null = null,
    outputFormat: string | null = null,
    solutionText: string | null = null,
    creatorId: number | null = null,
    isPublished: boolean | null = null,
  ): Promise<boolean>
```

Sửa một bài tập đang có trong CSDL, biết trước `problemId` của bài tập và một số tham số khác.

#### Tham số

- `problemId`: ID của bài tập trong cơ sở dữ liệu. Lấy giá trị này thông qua [`queryFindProblems`](#hàm-queryfindproblems)
- Các tham số còn lại: Xem [`queryAddProblem`](#hàm-queryaddproblem). Đặt là `null` để giữ nguyên giá trị đã có

#### Giá trị trả về

Một `Promise`, khi hoàn thành sẽ trả về `true` nếu thành công. Nếu có lỗi, hàm này sẽ ném lại lỗi đó.

#### Chú ý

Xem [`queryAddProblem`](#hàm-queryaddproblem)

### Hàm `queryDeleteProblem`

```ts
async queryDeleteProblem(problemId: number): Promise<boolean>
```

Xoá một bài tập với ID cho trước đã có trong CSDL.

#### Tham số

- `problemId`: ID của bài tập trong cơ sở dữ liệu. Lấy giá trị này thông qua [`queryFindProblems`](#hàm-queryfindproblems)

#### Giá trị trả về

Một `Promise`, khi hoàn thành sẽ trả về `true` nếu thành công. Nếu có lỗi, hàm này sẽ ném lại lỗi đó.

#### Chú ý

Nếu giá trị này không xuất hiện trong CSDL, không có gì xảy ra cả và hàm vẫn trả về `true` (do sử dụng `DELETE ... FROM ...`). Nếu xoá thành công, các bộ giá trị mang khoá ngoài tham chiếu đến giá trị này sẽ bị xoá (`ON DELETE CASCADE`).

### Hàm `queryGetProblemById`

```ts
async queryGetProblemById(problemId: number): Promise<string>
```

Trả về tất cả thông tin có trong CSDL cho một bài tập với ID của bài tập đó.

#### Tham số

- `problemId`: ID của bài tập trong cơ sở dữ liệu. Lấy giá trị này thông qua [`queryFindProblems`](#hàm-queryfindproblems)

#### Giá trị trả về

Một `Promise`, khi hoàn thành sẽ trả về một xâu có dạng JSON chứa tất cả các entry có trong CSDL nếu thành công. Nếu có lỗi, hàm này sẽ ném lại lỗi đó.

#### Chú ý

### Hàm `queryFindProblems`

```ts
async queryFindProblems(
    problemId: number | null = null,
    title: string | null = null,
    difficultyLow: number | null = null,
    difficultyHigh: number | null = null,
    createdAtLow: string | null = null,
    createdAtHigh: string | null = null,
    creatorId: number | null = null,
    isPublished: boolean | null = null,
    limitRangeStart: number = 0,
    limitRangeSize: number = 50,
  ): Promise<string>
```

Lấy một số thông tin của các bài tập trong CSDL, dựa vào một số điều kiện cho trước. Kết quả được sắp xếp theo thời gian tạo của bài tập, từ mới đến cũ.

#### Tham số

- `problemId`: ID của bài toán. Để `null` hoặc bỏ qua để không sử dụng.
- `title`: Tên của bài toán. Để `null` hoặc bỏ qua để không sử dụng. Nếu khác `null`, kết quả trả về sẽ là một bài toán chứa một trong các từ có trong `title` (tìm bằng Full Text Search) hoặc có tiền tố là `title`.
- `difficultyLow`: Cận dưới độ khó của bài toán. Để `null` hoặc bỏ qua để sử dụng giá trị `difficultyLow = 0`
- `difficultyHigh`: Cận trên độ khó của bài toán. Để `null` hoặc bỏ qua để sử dụng giá trị `difficultyHigh = 4000`
- `createdAtLow`: Cận dưới thời gian tạo bài toán, theo format `DATETIME` của MySQL `yyyy-mm-dd hh:mm:ss`. Để `null` hoặc bỏ qua để sử dụng giá trị `createdAtLow = 2000-01-01 00:00:00`
- `createdAtHigh`: Cận trên thời gian tạo bài toán, theo format `DATETIME` của MySQL `yyyy-mm-dd hh:mm:ss`. Để `null` hoặc bỏ qua để sử dụng giá trị `createdAtLow = NOW()`
- `creatorId`: `userId` của người tạo bài tập này. Để `null` hoặc bỏ qua để không sử dụng.
- `isPublished`: `userId` của người tạo bài tập này. Để `null` hoặc bỏ qua để không sử dụng.
- `limitRangeStart`, `limitRangeSize`: Các tham số phục vụ cho `LIMIT x, y` của MySQL. Để `null` hoặc bỏ qua để sử dụng `LIMIT 0, 50`.

#### Giá trị trả về

Một `Promise`, khi hoàn thành sẽ trả về một xâu có dạng JSON chứa `problem_id`, `title`, `difficulty`, `created_at`, `creator_id`, `is_published` có trong CSDL nếu thành công. Nếu có lỗi, hàm này sẽ ném lại lỗi đó.

#### Chú ý

Hàm này chỉ trả về một lượng giới hạn các thuộc tính của các bài tập theo các điều kiện cho trước. Để lấy tất cả các thuộc tính, sử dụng hàm [`queryGetProblemById`](#hàm-querygetproblembyid).

Để tìm kiếm các bài tập có gắn các tag, sử dụng hàm [`queryFindProblemsWithTags`](#hàm-queryfindproblemswithtags).

### Hàm `queryAddTag`

```ts
async queryAddTag(tagName: string, tagType: string): Promise<boolean>
```

Thêm một tag (nhãn bài tập) vào CSDL. Tags có thể là loại bài (`CATEGORY`) hoặc nguồn bài (`SOURCE`)

#### Tham số

- `tagName`: Tên tag
- `tagType`: Loại tag. Nhận 1 trong 2 giá trị xâu: `CATEGORY` cho các tag loại bài, và `SOURCE` cho nguồn bài

#### Giá trị trả về

Một `Promise`, khi hoàn thành sẽ trả về `true` nếu thành công. Nếu có lỗi, hàm này sẽ ném lại lỗi đó.

#### Chú ý

Một bài tập sẽ được gắn nhãn để dễ dàng tìm kiếm. Trong đó, loại bài thường là những phương pháp áp dụng trong bài đó, như `dp`, `divide and conquer`, ... còn nguồn bài thì đơn giản là bài đó có ở đâu.

Trong bảng `Tags` còn có một thuộc tính nữa là `isSelected`. Tham số này dùng để đánh dấu các nhãn đang được chọn (do MySQL không cho phép sử dụng các cấu trúc đa trị như mảng làm input).

### Hàm `queryEditTagAttr`

```ts
 async queryEditTagAttr(
    tagId: number,
    tagName: string | null = null,
    tagType: string | null = null,
    isSelected: boolean | null = null,
  ): Promise<boolean>
```

Sửa các thuộc tính đã có của một tag trong CSDL. Các thuộc tính cũng bao gồm `isSelected`, cho phép chọn/bỏ chọn bộ lọc tag.

#### Tham số

- `tagId`: ID của tag, có thể lấy từ [`queryFindTags`](#hàm-queryfindtags)
- `tagName`: Tên tag. Để là `null` hoặc bỏ qua để giữ nguyên giá trị
- `tagType`: Loại tag. Nhận 1 trong 2 giá trị xâu: `CATEGORY` cho các tag loại bài, và `SOURCE` cho nguồn bài. Để là `null` hoặc bỏ qua để giữ nguyên giá trị.
- `isSelected`: Giá trị boolean, thể hiện tag hiện tại có được chọn vào bộ lọc không. Để là `null` hoặc bỏ qua để giữ nguyên giá trị.

#### Giá trị trả về

Một `Promise`, khi hoàn thành sẽ trả về `true` nếu thành công. Nếu có lỗi, hàm này sẽ ném lại lỗi đó.

#### Chú ý

Về ý nghĩa của các giá trị, xem hàm [`queryAddTag`](#hàm-queryaddtag).

Hàm này cũng có thể được sử dụng để chọn/bỏ chọn một số tags phục vụ cho việc tìm kiếm. Xem hàm [`queryFindProblemsWithTags`](#hàm-queryfindproblemswithtags) để biết thêm về cách dùng này.

### Hàm `queryDeleteTag`

```ts
 async queryDeleteTag(tagId: number): Promise<boolean>
```

Xoá một tag khỏi CSDL.

#### Tham số

- `tagId`: ID của tag, có thể lấy từ [`queryFindTags`](#hàm-queryfindtags)

#### Giá trị trả về

Một `Promise`, khi hoàn thành sẽ trả về `true` nếu thành công. Nếu có lỗi, hàm này sẽ ném lại lỗi đó.

#### Chú ý

Nếu giá trị này không xuất hiện trong CSDL, không có gì xảy ra cả và hàm vẫn trả về `true` (do sử dụng `DELETE ... FROM ...`). Nếu xoá thành công, các bộ giá trị mang khoá ngoài tham chiếu đến giá trị này sẽ bị xoá (`ON DELETE CASCADE`).

### Hàm `queryFindTags`

```ts
async queryFindTags(
    tagId: number | null = null,
    tagName: string | null = null,
    tagType: string | null = null,
    isSelected: boolean | null = null,
  ): Promise<string>
```

Tìm các tag thoả mãn một số tiêu chí cho trước.

#### Tham số

Xem [queryEditTagAttr](#hàm-queryedittagattr) để hiểu ý nghĩa. Tất cả các tham số đều có thể để là `null` hoặc bỏ qua để không tìm kiếm theo tiêu chí đó. Nếu tất cả đều là `null` hoặc không có tham số, hàm sẽ trả về tất cả tags.

#### Giá trị trả về

Một `Promise`, khi hoàn thành sẽ trả về một xâu có dạng JSON chứa tất cả các thuộc tính của các giá trị thoả mãn có trong CSDL nếu thành công. Nếu có lỗi, hàm này sẽ ném lại lỗi đó.

#### Chú ý

Một số ví dụ sử dụng:

- Liệt kê tất cả các tag: `queryFindTags()`
- Liệt kê tất cả các nguồn bài: `quertFindTags(null, null, "SOURCE")`
- Liệt kê tất cả các tag đang được chọn cho việc lọc bài tập: `quertFindTags(null, null, null, true)`

### Hàm `queryAddTaggedProblem`

```ts
async queryAddTaggedProblem(
    problemId: number,
    tagId: number,
  ): Promise<boolean>
```

Thêm một tag cho một bài tập.

#### Tham số

- `problemId`: ID của bài tập, có thể lấy được qua [`queryFindProblems`](#hàm-queryfindproblems)
- `tagId`: ID của tag, có thể lấy được qua [`queryFindTags`](#hàm-queryfindtags)

#### Giá trị trả về

Một `Promise`, khi hoàn thành sẽ trả về `true` nếu thành công. Nếu có lỗi, hàm này sẽ ném lại lỗi đó.

#### Chú ý

### Hàm `queryDeleteTaggedProblem`

```ts
async queryDeleteTaggedProblem(
    problemId: number,
    tagId: number,
  ): Promise<boolean>
```

Xoá một tag có trong cho một bài tập.

#### Tham số

- `problemId`: ID của bài tập, có thể lấy được qua [`queryFindProblems`](#hàm-queryfindproblems)
- `tagId`: ID của tag, có thể lấy được qua [`queryFindTags`](#hàm-queryfindtags)

#### Giá trị trả về

Một `Promise`, khi hoàn thành sẽ trả về `true` nếu thành công. Nếu có lỗi, hàm này sẽ ném lại lỗi đó.

#### Chú ý

Nếu giá trị này không xuất hiện trong CSDL, không có gì xảy ra cả và hàm vẫn trả về `true` (do sử dụng `DELETE ... FROM ...`).

### Hàm `queryFindTagsByProblems`

```ts
async queryFindTagsByProblem(problemId: number): Promise<string>
```

Liệt kê các tag có trong một bài tập.

#### Tham số

- `problemId`: ID của bài tập, có thể lấy được qua [`queryFindProblems`](#hàm-queryfindproblems)

#### Giá trị trả về

Một `Promise`, khi hoàn thành sẽ trả về `true` nếu thành công. Nếu có lỗi, hàm này sẽ ném lại lỗi đó.

#### Chú ý

### Hàm `queryFindProblemsWithTags`

```ts
async queryFindProblemsWithTags(
    problemId: number | null = null,
    title: string | null = null,
    difficultyLow: number | null = null,
    difficultyHigh: number | null = null,
    createdAtLow: string | null = null,
    createdAtHigh: string | null = null,
    creatorId: number | null = null,
    isPublished: boolean | null = null,
    limitRangeStart: number | null = 0,
    limitRangeSize: number | null = 50,
  ): Promise<string>
```

Lấy một số thông tin của một bài tập có nhãn là các nhãn đang được lựa chọn trong CSDL, dựa vào một số điều kiện cho trước. Kết quả được sắp xếp theo thời gian tạo của bài tập, từ mới đến cũ.

#### Tham số

- `problemId`: ID của bài toán. Để `null` hoặc bỏ qua để không sử dụng.
- `title`: Tên của bài toán. Để `null` hoặc bỏ qua để không sử dụng. Nếu khác `null`, kết quả trả về sẽ là một bài toán chứa một trong các từ có trong `title` (tìm bằng Full Text Search) hoặc có tiền tố là `title`.
- `difficultyLow`: Cận dưới độ khó của bài toán. Để `null` hoặc bỏ qua để sử dụng giá trị `difficultyLow = 0`
- `difficultyHigh`: Cận trên độ khó của bài toán. Để `null` hoặc bỏ qua để sử dụng giá trị `difficultyHigh = 4000`
- `createdAtLow`: Cận dưới thời gian tạo bài toán, theo format `DATETIME` của MySQL `yyyy-mm-dd hh:mm:ss`. Để `null` hoặc bỏ qua để sử dụng giá trị `createdAtLow = 2000-01-01 00:00:00`
- `createdAtHigh`: Cận trên thời gian tạo bài toán, theo format `DATETIME` của MySQL `yyyy-mm-dd hh:mm:ss`. Để `null` hoặc bỏ qua để sử dụng giá trị `createdAtLow = NOW()`
- `creatorId`: `userId` của người tạo bài tập này. Để `null` hoặc bỏ qua để không sử dụng.
- `isPublished`: `userId` của người tạo bài tập này. Để `null` hoặc bỏ qua để không sử dụng.
- `limitRangeStart`, `limitRangeSize`: Các tham số phục vụ cho `LIMIT x, y` của MySQL. Để `null` hoặc bỏ qua để sử dụng `LIMIT 0, 50`.

#### Giá trị trả về

Một `Promise`, khi hoàn thành sẽ trả về một xâu có dạng JSON chứa `problem_id`, `title`, `difficulty`, `created_at`, `creator_id`, `is_published` có trong CSDL nếu thành công. Nếu có lỗi, hàm này sẽ ném lại lỗi đó.

#### Chú ý

Hàm này thực chất thực hiện chọn các tag có `is_selected = TRUE`. Do đó, trước hết cần phải chọn một số tag bằng cách sử dụng `queryEditTagAttr(tag_id, null, null, true)`.

Hàm này chỉ trả về một lượng giới hạn các thuộc tính của các bài tập theo các điều kiện cho trước. Để lấy tất cả các thuộc tính, sử dụng hàm [`queryGetProblemById`](#hàm-querygetproblembyid).

### Hàm `queryAddTestCase`

```ts
async queryAddTestCase(
    title: string,
    problemId: number,
    input: string,
    expectedOutput: string,
    isHidden: boolean = false,
  ): Promise<boolean>
```

Thêm một test case cho một bài tập vào CSDL.

#### Tham số

- `title`: Tên của test case, ví dụ "Test #1"
- `problemId`: ID của bài tập chứa test case này
- `input`: Đầu vào cho test case. Nếu sử dụng file system để chứa input file, giá trị của thuộc tính này là địa chỉ file
- `expected_output`: Đầu ra cho test case. Nếu sử dụng file system để chứa answer file, giá trị của thuộc tính này là địa chỉ file
- `isHidden`: Thuộc tính boolean, nếu để `true` thì người dùng thường (`CU`) có thể xem input và expected output của test case này, ngược lại thì không xem được. Bỏ qua để sử dụng giá trị `false`

#### Giá trị trả về

Một `Promise`, khi hoàn thành sẽ trả về `true` nếu thành công. Nếu có lỗi, hàm này sẽ ném lại lỗi đó.

#### Chú ý

Về ý nghĩa của các tham số, xem [Ý nghĩa các bảng](#ý-nghĩa-các-bảng).

### Hàm `queryEditTestCase`

```ts
async queryEditTestCase(
    testCaseId: number,
    title: string | null = null,
    problemId: number | null = null,
    input: string | null = null,
    expectedOutput: string | null = null,
    isHidden: boolean | null = null,
  ): Promise<boolean>
```

Sửa các thuộc tính đã có của một test case trong CSDL.

#### Tham số

- `testCaseId`: ID của test case, có thể lấy từ [`queryFindTestCases`](#hàm-queryfindtestcases)
- Các tham số khác: Xem [`queryAddTestCase`](#hàm-queryaddtestcase). Đặt là `null` hoặc bỏ qua để giữ nguyên giá trị trong bảng.

#### Giá trị trả về

Một `Promise`, khi hoàn thành sẽ trả về `true` nếu thành công. Nếu có lỗi, hàm này sẽ ném lại lỗi đó.

#### Chú ý

Về ý nghĩa của các tham số, xem [Ý nghĩa các bảng](#ý-nghĩa-các-bảng).

### Hàm `queryDeleteTestCase`

```ts
async queryDeleteTestCase(testCaseId: number): Promise<boolean>
```

Xoá một test case trong CSDL.

#### Tham số

- `testCaseID`: ID của test case, có thể lấy được qua [`queryFindTestCases`](#hàm-queryfindtestcases)

#### Giá trị trả về

Một `Promise`, khi hoàn thành sẽ trả về `true` nếu thành công. Nếu có lỗi, hàm này sẽ ném lại lỗi đó.

#### Chú ý

Nếu giá trị này không xuất hiện trong CSDL, không có gì xảy ra cả và hàm vẫn trả về `true` (do sử dụng `DELETE ... FROM ...`).

### Hàm `queryGetTestCaseById`

```ts
async queryGetTestCaseById(testCaseId: number): Promise<string>
```

Trả về tất cả thông tin có trong CSDL cho một test case từ ID của test case đó.

#### Tham số

- `testCaseId`: ID của test case trong cơ sở dữ liệu. Có thể lấy giá trị này thông qua [`queryFindTestCases`](#hàm-queryfindtestcases)

#### Giá trị trả về

Một `Promise`, khi hoàn thành sẽ trả về một xâu có dạng JSON chứa tất cả các entry có trong CSDL nếu thành công. Nếu có lỗi, hàm này sẽ ném lại lỗi đó.

#### Chú ý

Về ý nghĩa của các tham số, xem [Ý nghĩa các bảng](#ý-nghĩa-các-bảng).

### Hàm `queryFindTestCases`

```ts
async queryFindTestCases(
    testCaseId: number | null = null,
    title: string | null = null,
    problemId: number | null = null,
    isHidden: boolean | null = null,
    limitRangeStart: number = 0,
    limitRangeSize: number = 100,
  ): Promise<string>
```

Lấy một số thông tin các test case tập trong CSDL thoả mãn một số điều kiện cho trước.

#### Tham số

- 4 tham số đầu: Xem [`queryAddTestCase](#hàm-queryaddtestcase)
- `limitRangeStart, limitRangeSize`: 2 số nguyên để phục vụ cho `LIMIT x, y` trong MySQL. Bỏ qua để sử dụng `LIMIT 0, 100`

#### Giá trị trả về

Một `Promise`, khi hoàn thành sẽ trả về một xâu có dạng JSON chứa `test_case_id`, `title`, `problem_id`, `is_hidden` có trong CSDL nếu thành công. Nếu có lỗi, hàm này sẽ ném lại lỗi đó.

#### Chú ý

Về ý nghĩa của các tham số, xem [Ý nghĩa các bảng](#ý-nghĩa-các-bảng).

Hàm này chỉ trả về một lượng giới hạn các thuộc tính của các test case theo các điều kiện cho trước. Để lấy tất cả các thuộc tính, sử dụng hàm [`queryGetTestCaseById`](#hàm-querygettestcasebyid).

### Hàm `queryAddContest`

```ts
async queryAddContest(
    title: string,
    description: string | null,
    startTime: string,
    endTime: string,
    scoringRule: string,
    organizerId: number,
    isPublished: boolean = false,
    isPlagiarismCheckEnabled: boolean = false,
  ): Promise<boolean>
```

Thêm một kỳ thi vào CSDL.

#### Tham số

- `title`: Tên của kỳ thi
- `description`: Mô tả kỳ thi. Có thể để null
- `startTime`: Thời gian bắt đầu kỳ thi dưới dạng `DATETIME` MySQL `yyyy-mm-dd hh:mm:ss`
- `endTime`: Thời gian kết thúc kỳ thi dưới dạng `DATETIME` MySQL `yyyy-mm-dd hh:mm:ss`
- `scoringRule`: Quy tắc chấm điểm của kỳ thi. Nhận một trong hai giá trị `ICPC` hoặc `IOI`
- `organizerID`: ID của người tạo contest. Người tạo contest phải có role là Admin, nếu không sẽ gây lỗi
- `isPublished`: Thuộc tính boolean cho biết bài toán này đã được hoàn thiện để đăng lên chưa (dùng cho tính năng Save Draft). Để là `null` hoặc bỏ qua tham số này sẽ ngầm định `isPublished = 0`.
- `isPlagiarismCheckEnabled`: Thuộc tính boolean, nếu để `true` thì contest cho phép check chép code

#### Giá trị trả về

Một `Promise`, khi hoàn thành sẽ trả về `true` nếu thành công. Nếu có lỗi, hàm này sẽ ném lại lỗi đó.

#### Chú ý

Về ý nghĩa của các tham số, xem [Ý nghĩa các bảng](#ý-nghĩa-các-bảng).

### Hàm `queryEditContest`

```ts
async queryEditContest(
    contestId: number,
    title: string | null = null,
    description: string | null = null,
    startTime: string | null = null,
    endTime: string | null = null,
    scoringRule: string | null = null,
    organizerId: number | null = null,
    isPublished: boolean | null = null,
    isPlagiarismCheckEnabled: boolean | null = null,
  ): Promise<boolean>
```

Sửa các thuộc tính đã có của một kỳ thi trong CSDL.

#### Tham số

- `contestId`: ID của kỳ thi, có thể lấy từ [`queryFindContests`](#hàm-queryfindcontests)
- Các tham số khác: Xem [`queryAddContest`](#hàm-queryaddcontest). Đặt là `null` hoặc bỏ qua để giữ nguyên giá trị trong bảng.

#### Giá trị trả về

Một `Promise`, khi hoàn thành sẽ trả về `true` nếu thành công. Nếu có lỗi, hàm này sẽ ném lại lỗi đó.

#### Chú ý

Về ý nghĩa của các tham số, xem [Ý nghĩa các bảng](#ý-nghĩa-các-bảng).

### Hàm `queryDeleteContest`

```ts
async queryDeleteContest(contestId: number): Promise<boolean>
```

Xoá một test case trong CSDL.

#### Tham số

- `contestId`: ID của kỳ thi, có thể lấy từ [`queryFindContests`](#hàm-queryfindcontests)

#### Giá trị trả về

Một `Promise`, khi hoàn thành sẽ trả về `true` nếu thành công. Nếu có lỗi, hàm này sẽ ném lại lỗi đó.

#### Chú ý

Nếu giá trị này không xuất hiện trong CSDL, không có gì xảy ra cả và hàm vẫn trả về `true` (do sử dụng `DELETE ... FROM ...`). Nếu xoá thành công, các bộ giá trị mang khoá ngoài tham chiếu đến giá trị này sẽ bị xoá (`ON DELETE CASCADE`).

### Hàm `queryGetContestById`

```ts
async queryGetContestById(contestId: number): Promise<string>
```

Trả về tất cả thông tin có trong CSDL cho một kỳ thi từ ID của kỳ thi đó.

#### Tham số

- `contestId`: ID của kỳ thi, có thể lấy từ [`queryFindContests`](#hàm-queryfindcontests)

#### Giá trị trả về

Một `Promise`, khi hoàn thành sẽ trả về một xâu có dạng JSON chứa tất cả các entry có trong CSDL nếu thành công. Nếu có lỗi, hàm này sẽ ném lại lỗi đó.

#### Chú ý

Về ý nghĩa của các tham số, xem [Ý nghĩa các bảng](#ý-nghĩa-các-bảng).

### Hàm `queryFindContests`

```ts
async queryFindContests(
    contestId: number | null = null,
    title: string | null = null,
    scoringRule: string | null = null,
    organizerId: number | null = null,
  ): Promise<string>
```

Lấy một số thông tin các kỳ thi trong CSDL thoả mãn một số điều kiện cho trước.

#### Tham số

Xem [`queryAddContest`](#hàm-queryaddcontest)

#### Giá trị trả về

Một `Promise`, khi hoàn thành sẽ trả về một xâu có dạng JSON chứa `contest_id`, `title`, `start_time`, `end_time`, `scoring_rule`, `organizer`, `is_published` có trong CSDL nếu thành công. Nếu có lỗi, hàm này sẽ ném lại lỗi đó.

#### Chú ý

Về ý nghĩa của các tham số, xem [Ý nghĩa các bảng](#ý-nghĩa-các-bảng).

Hàm này chỉ trả về một lượng giới hạn các thuộc tính của các kỳ thi theo các điều kiện cho trước. Để lấy tất cả các thuộc tính, sử dụng hàm [`queryGetContestById`](#hàm-querygetcontestbyid).

### Hàm `queryAddProblemToContest`

```ts
async queryAddProblemToContest(
    contestId: number,
    problemId: number,
    point: number,
  ): Promise<boolean>
```

Thêm một bài tập vào một kỳ thi đã có trong CSDL.

#### Tham số

- `contestId`: ID kỳ thi, có thể lấy được từ [`queryFindContests`](#hàm-queryfindcontests)
- `problemId`: ID của bài tập được thêm vào, có thể lấy được từ [`queryFindProblems`](#hàm-queryfindproblems)
- `point`: Điểm số của bài tập này trong kỳ thi

#### Giá trị trả về

Một `Promise`, khi hoàn thành sẽ trả về `true` nếu thành công. Nếu có lỗi, hàm này sẽ ném lại lỗi đó.

#### Chú ý

Về ý nghĩa của các tham số, xem [Ý nghĩa các bảng](#ý-nghĩa-các-bảng).

### Hàm `queryEditProblemPointInContest`

```ts
async queryEditProblemPointInContest(
    contestId: number,
    problemId: number,
    point: number | null,
  ): Promise<boolean>
```

Sửa điểm số của bài tập trong một kỳ thi đã có trong CSDL.

#### Tham số

- `contestId`: ID kỳ thi, có thể lấy được từ [`queryFindContests`](#hàm-queryfindcontests)
- `problemId`: ID của bài tập, có thể lấy được từ [`queryFindProblems`](#hàm-queryfindproblems)
- `point`: Số điểm cần sửa. Đặt là `null` nếu muốn giữ nguyên

#### Giá trị trả về

Một `Promise`, khi hoàn thành sẽ trả về `true` nếu thành công. Nếu có lỗi, hàm này sẽ ném lại lỗi đó.

#### Chú ý

Về ý nghĩa của các tham số, xem [Ý nghĩa các bảng](#ý-nghĩa-các-bảng).

### Hàm `queryDeleteProblemFromContest`

```ts
async queryDeleteProblemFromContest(
    contestId: number,
    problemId: number,
  ): Promise<boolean>
```

Xoá bài tập khỏi một kỳ thi đã có trong CSDL.

#### Tham số

- `contestId`: ID kỳ thi, có thể lấy được từ [`queryFindContests`](#hàm-queryfindcontests)
- `problemId`: ID của bài tập, có thể lấy được từ [`queryFindProblems`](#hàm-queryfindproblems)

#### Giá trị trả về

Một `Promise`, khi hoàn thành sẽ trả về `true` nếu thành công. Nếu có lỗi, hàm này sẽ ném lại lỗi đó.

#### Chú ý

Về ý nghĩa của các tham số, xem [Ý nghĩa các bảng](#ý-nghĩa-các-bảng).

Nếu giá trị này không xuất hiện trong CSDL, không có gì xảy ra cả và hàm vẫn trả về `true` (do sử dụng `DELETE ... FROM ...`)

### Hàm `queryGetProblemsInContest`

```ts
async queryGetProblemsInContest(contestId: number): Promise<string>
```

Liệt kê tất cả các bài tập cùng điểm số của chúng trong một kỳ thi

#### Tham số

- `contestId`: ID của kỳ thi, có thể lấy từ [`queryFindContests`](#hàm-queryfindcontests)

#### Giá trị trả về

Một `Promise`, khi hoàn thành sẽ trả về một xâu có dạng JSON chứa tất cả các entry có trong CSDL nếu thành công. Nếu có lỗi, hàm này sẽ ném lại lỗi đó.

#### Chú ý

Về ý nghĩa của các tham số, xem [Ý nghĩa các bảng](#ý-nghĩa-các-bảng).

### Hàm `queryAddSubmission`

```ts
async queryAddSubmission(
    userId: number,
    problemId: number,
    contestId: number,
    sourceCodeLanguage: string,
    sourceCodeFileId: number,
    status: string,
    compilerMessage: string | null,
  ): Promise<boolean>
```

### Hàm `queryEditSubmission`

```ts
async queryEditSubmission(
    submissionId: number,
    userId: number | null = null,
    problemId: number | null = null,
    contestId: number | null = null,
    sourceCodeLanguage: string | null = null,
    sourceCodeFileId: number | null = null,
    status: string | null = null,
    compilerMessage: string | null = null,
  ): Promise<boolean>
```

### Hàm `queryDeleteSubmission`

```ts
async queryDeleteSubmission(submissionId: number): Promise<boolean>
```

### Hàm `queryGetSubmissionById`

```ts
async queryGetSubmissionById(submissionId: number): Promise<string>
```

### Hàm `queryFindSubmissions`

```ts
async queryFindSubmissions(
    submissionId: number | null = null,
    userId: number | null = null,
    problemId: number | null = null,
    contestId: number | null = null,
    sourceCodeLanguage: string | null = null,
    sourceCodeFileId: number | null = null,
    status: string | null = null,
  ): Promise<string>
```

### Hàm `queryFindOfficialSubmissionsInContests`

```ts
async queryFindOfficialSubmissionsInContests(
    contestId: number,
    userId: number | null = null,
  ): Promise<string>
```

### Hàm `queryGetContestRanking`

```ts
async queryGetContestRanking(
    contestId: number,
    limitRangeStart: number = 0,
    limitRangeSize: number = 100,
  ): Promise<string>
```

### Hàm `queryGetSolvedProblemsInContestByUser`

```ts
async queryGetSolvedProblemsInContestByUser(
    contestId: number,
    userId: number,
  ): Promise<string>
```

### Hàm `queryAddSubmissionResultBySubmission`

```ts
async queryAddSubmissionResultBySubmission(
    submissionId: number,
    testCaseId: number,
    timeElapsed: number,
    memoryUsed: number,
    output: string | null,
    judgeMessage: string | null,
    judgedAt: string,
    status: string,
  ): Promise<boolean>
```

### Hàm `queryDeleteAllSubmissionResultsBySubmission`

```ts
async queryDeleteAllSubmissionResultsBySubmission(
    submissionId: number,
  ): Promise<boolean>
```

### Hàm `queryGetSubmissionResultBySubmission`

```ts
async queryGetSubmissionResultBySubmission(
    submissionId: number,
  ): Promise<string>
```

### Hàm `queryAddUser`

```ts
async queryAddUser(
    userName: string,
    email: string,
    password: string,
    role: string[],
  ): Promise<boolean>
```

### Hàm `queryEditUserAttr`

```ts
async queryEditUserAttr(
    userId: number,
    userName: string | null = null,
    email: string | null = null,
    password: string | null = null,
    role: string[] = [],
    rating: number | null = null,
  ): Promise<boolean>
```

### Hàm `queryDeleteUser`

```ts
 async queryDeleteUser(userId: number): Promise<boolean>
```

### Hàm `queryGetUserById`

```ts
async queryGetUserById(userId: number): Promise<string>
```

### Hàm `queryFindUsers`

```ts
async queryFindUsers(
    userId: number | null = null,
    userName: string | null = null,
    email: string | null = null,
    role: string | null = null,
    ratingLow: number | null = null,
    ratingHigh: number | null = null,
    limitRangeStart: number = 0,
    limitRangeSize: number = 100,
  ): Promise<string>
```

### Hàm `queryAddAchievement`

```ts
async queryAddAchievement(userId: number, title: string): Promise<boolean>
```

### Hàm `queryEditAchievementAttr`

```ts
async queryEditAchievementAttr(
    achievementId: number,
    title: string | null = null,
    attachment: string | null = null,
    isVerified: boolean | null = null,
  ): Promise<boolean>
```

### Hàm `queryDeleteAchievement`

```ts
async queryDeleteAchievement(achievementId: number): Promise<boolean>
```

### Hàm `queryGetAchievementById`

```ts
async queryGetAchievementById(achievementId: number): Promise<string>
```

### Hàm `queryGetAchievementsByUser`

```ts
async queryGetAchievementsByUser(userId: number): Promise<string>
```

### Hàm `queryAddNotification`

```ts
async queryAddNotification(
    receiverId: number,
    content: string,
  ): Promise<boolean>
```

### Hàm `queryEditNotificationAttr`

```ts
async queryEditNotificationAttr(
    notificationId: number,
    receiverId: number | null = null,
    content: string | null = null,
  ): Promise<boolean>
```

### Hàm `queryDeleteNotification`

```ts
 async queryDeleteNotification(notificationId: number): Promise<boolean>
```

### Hàm `queryFindNotifications`

```ts
async queryFindNotifications(
    notificationId: number | null = null,
    receiverId: number | null = null,
    limitRangeStart: number = 0,
    limitRangeSize: number = 100,
  ): Promise<string>
```

### Hàm `queryAddDiscussionMessage`

```ts
async queryAddDiscussionMessage(
    senderId: number,
    problemId: number,
    parentId: number | null,
    content: string,
  ): Promise<boolean>
```

### Hàm `queryEditDiscussionMessageAttr`

```ts
async queryEditDiscussionMessageAttr(
    messageId: number,
    senderId: number | null = null,
    problemId: number | null = null,
    parentId: number | null = null,
    content: string | null = null,
  ): Promise<boolean>
```

### Hàm `queryFindDiscussionMessages`

```ts
async queryFindDiscussionMessages(
    messageId: number | null = null,
    senderId: number | null = null,
    problemId: number | null = null,
    parentId: number | null = null,
    limitRangeStart: number = 0,
    limitRangeSize: number = 100,
  ): Promise<string>
```

### Hàm `queryFindRootDiscussionMessages`

```ts
async queryFindRootDiscussionMessages(
    messageId: number | null = null,
    senderId: number | null = null,
    problemId: number | null = null,
    limitRangeStart: number = 0,
    limitRangeSize: number = 100,
  ): Promise<string>
```

### Hàm `queryGetSolvedProblemsByUser`

```ts
async queryGetSolvedProblemsByUser(userId: number): Promise<string>
```

### Hàm `queryGetSolvedUsersByProblem`

```ts
async queryGetSolvedUsersByProblem(problemId: number): Promise<string>
```

### Hàm `queryGetParticipatedContestsByUser`

```ts
async queryGetParticipatedContestsByUser(userId: number): Promise<string>
```

### Hàm `queryGetContestParticipants`

```ts
async queryGetContestParticipants(contestId: number): Promise<string>
```
