const { createApp } = Vue;

const ContactApp = createApp({
    data() {
        return {
            form: {
                name: "",
                email: "",
                message: ""
            },
            contacts: [], // 存放從伺服器抓回的陣列
            status: ""    // 狀態控制：ok, error
        };
    },
    methods: {
        // 使用 fetch 獲取資料
        async fetchContacts() {
            try {
                const response = await fetch("/contact");
                if (!response.ok) throw new Error("網路回應不正常");
                const data = await response.json();
                this.contacts = data;
            } catch (error) {
                console.error("獲取資料失敗:", error);
            }
        },

        // 使用 fetch 送出資料
        async submitForm() {
            try {
                const response = await fetch("/contact", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(this.form)
                });

                if (!response.ok) throw new Error("送出失敗");

                const result = await response.json();
                this.contacts = result; // 後端回傳最新清單
                this.status = "ok";

                // 清空表單
                this.form.name = "";
                this.form.email = "";
                this.form.message = "";
            } catch (error) {
                console.error("送出錯誤:", error);
                this.status = "error";
            }
        }
    },
    // Vue 實體掛載後立即執行
    mounted() {
        this.fetchContacts();
    }
}).mount("#contactApp");