const SUPABASE_URL = "https://brlelikwcfihbdwsgtoj.supabase.co";
const SUPABASE_KEY = "sb_publishable_SsUs4hAdKY_oTsn23yCDMA_3XMQUqbN";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

let currentTopic = "";


function openForm(title) {

    currentTopic = title;

    document.getElementById("formTitle").innerText = title;

    document.getElementById("formModal").classList.add("show");

}


function closeForm() {

    document
        .getElementById("formModal")
        .classList.remove("show");

}


async function submitForm(event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const detail =
        document.getElementById("detail").value.trim();

    const note =
        document.getElementById("note").value.trim();
    const link =
        document.getElementById("link").value.trim();
        console.log("LINK TEST:", link);
    const { error } = await supabaseClient
        .from("proposals")
        .insert([
            {
                topic: currentTopic,
                name: name,
                detail: detail,
                note: note,
                link: link,
                status: "รอตรวจสอบ"
            }
        ]);


    if (error) {

        console.error(error);

        alert(
            "ส่งข้อเสนอไม่สำเร็จ ❌\n\n" +
            error.message
        );

        return;
    }


    alert("ส่งข้อเสนอเรียบร้อยแล้ว! ✅");


    closeForm();

    document.querySelector("form").reset();

}function logout() {

    localStorage.removeItem("userEmail");

    window.location.href = "login.html";

}