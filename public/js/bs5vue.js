const { createApp } = Vue;

var contactApp = createApp({
    data() {
        return {
            // 1. 限制傳送內容：名字、電郵、信息
            form: {
                name: "",
                email: "",
                message: ""
            },
            contacts: [], // 儲存下方列表資料
            status: ""    // 控制顯示成功或失敗訊息
        }
    },
    methods: {
        submitForm() {
            // 使用 jQuery AJAX 傳送資料
            $.ajax({
                url: "/contact",
                method: "post",
                data: this.form, // 傳送內容只有 name, email, message
                success: (result) => {
                    this.status = "ok";
                    this.fetchContacts(); // 成功後更新列表
                    // 清空表單
                    this.form = { name: "", email: "", message: "" };
                },
                error: (err) => {
                    this.status = "error";
                }
            });
        },
        fetchContacts() {
            // 取得所有留言訊息
            $.ajax({
                url: "/contact", // 假設後端 GET /contact 回傳所有資料
                method: "get",
                dataType: "json",
                success: (result) => {
                    this.contacts = result;
                }
            });
        }
    },
    mounted() {
        this.fetchContacts(); // 頁面載入時先獲取一次資料
    }
}).mount("#contactApp");