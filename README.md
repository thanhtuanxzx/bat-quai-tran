# Bát Quái Tỏa Tiên Trận (Bagua Immortal-Locking Array)

Một mini-game/visualizer mang đậm chất tiên hiệp, xoay quanh các khái niệm cổ xưa như Ngũ Hành tương sinh tương khắc, Bát Quái, Sinh Tử Môn và những hiệu ứng hình ảnh kỳ ảo. Toàn bộ được xây dựng bằng HTML, CSS (3D Transforms, Animations) và Vanilla JavaScript thuần trên một file duy nhất.

## 🌟 Tính Năng Nổi Bật

* **Đồ Họa 3D Huyền Ảo:** Trận đồ 3 vòng luân chuyển (Nội - Trung - Ngoại) xoay ngược chiều nhau quanh lõi Thái Cực Đồ, kết hợp với các hạt năng lượng và hiệu ứng ánh sáng (glow) bắt mắt.
* **Hệ Thống Ngũ Hành Tự Động:** Mỗi 6 giây, trận đồ sẽ tự động chuyển hóa qua 5 giai đoạn: **Kim ➔ Thủy ➔ Mộc ➔ Hỏa ➔ Thổ**. Màu sắc của toàn bộ không gian và các ký tự sẽ mượt mà thay đổi tương ứng với hệ hiện tại.
* **Mini-game Sinh Tồn (Sinh Môn - Tử Môn):**
  * Dựa vào hệ Ngũ Hành hiện tại, người chơi phải tìm và nhấp vào đúng **Ký hiệu Bát Quái (Sinh Môn)** xoay ở vòng trong cùng.
  * Nhấp đúng (Sinh Môn): Lóe sáng xanh, hồi phục **+15 Thọ Nguyên** (HP).
  * Nhấp sai (Tử Môn): "Vạn Kiếm Xuyên Tâm", lóe sáng đỏ, trừ **-25 Thọ Nguyên**.
  * Chần chừ không chọn khi chuyển hệ: Tà khí xâm nhập, trừ **-15 Thọ Nguyên**.
* **Hiệu Ứng Đảo Lộn Không Gian:** Sau khi hoàn thành một vòng tuần hoàn Ngũ Hành, trận đồ sẽ kích phát trạng thái cuồng nạo: Toàn bộ không gian bị méo mó, lật ngược 180 độ và đảo ngược màu sắc (Invert & Hue-rotate) gây ảo giác mạnh cho người chơi.
* **Giao Diện Tiên Hiệp:** Sử dụng phông chữ **Cormorant Garamond** mang lại cảm giác cổ thư thư tịch, hỗ trợ hiển thị Tiếng Việt hoàn hảo. Có màn hình chờ (Menu) và màn hình tử vong (Game Over) đầy đủ.

## 📜 Bí Kíp Phá Trận

Để sống sót lâu nhất, bạn cần ghi nhớ quy luật tương ứng giữa Ngũ Hành và Bát Quái trong trận đồ này:
* **Kim** ➔ Càn (☰)
* **Thủy** ➔ Khảm (☵)
* **Mộc** ➔ Chấn (☳)
* **Hỏa** ➔ Ly (☲)
* **Thổ** ➔ Khôn (☷)

## 🚀 Cách Cài Đặt & Chơi

Không cần cài đặt bất kỳ server hay thư viện nào! 
1. Bạn chỉ cần tải file `index.html` về máy.
2. Nhấp đúp chuột (hoặc kéo thả) file `index.html` để mở bằng bất kỳ trình duyệt web hiện đại nào (Google Chrome, Edge, Firefox, Safari...).
3. Bấm **"Tiến Vào Trận Pháp"** và thử thách khả năng sinh tồn của bạn!

## 🛠 Công Nghệ Sử Dụng

* **HTML5:** Cấu trúc giao diện và layout 3D.
* **CSS3:** Sử dụng CSS Variables (tùy biến màu sắc), Keyframe Animations (hiệu ứng xoay, nhấp nháy, sóng năng lượng), 3D Transforms (xoay góc nhìn perspective) và Filters (đảo màu không gian).
* **Vanilla JavaScript:** Xử lý logic trò chơi (vòng lặp Ngũ Hành, trừ máu, tính toán Sinh/Tử môn) và tương tác với chuột/cảm ứng.
