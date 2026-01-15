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
        fetchContacts() {
            // 取得所有留言訊息
            $.get("/contact", (result) => {
                this.contacts = result;
            });
        },

        submitForm() {
            // 使用 jQuery AJAX 傳送資料
            $.ajax({
                url: "/contact",
                method: "post",
                contentType: "application/json",
                data: JSON.stringify(this.form),
                // dataType: "json", // 傳送內容只有 name, email, message
                success: (result) => {
                    this.status = "ok";
                    this.form = { name: "", email: "", message: "" };// 清空表單
                    this.fetchContacts(); // 成功後更新列表
                },
                error: (err) => {
                    this.status = "error";
                }
            });
        }

    },
    mounted() {
        this.fetchContacts(); // 頁面載入時先獲取一次資料
    }
}).mount("#contactApp");