function generatePlan() {
    const subject1 = document.getElementById("subject1").value.trim();
    const date1 = document.getElementById("date1").value;

    const subject2 = document.getElementById("subject2").value.trim();
    const date2 = document.getElementById("date2").value;

    const subject3 = document.getElementById("subject3").value.trim();
    const date3 = document.getElementById("date3").value;

    const hours = Number(document.getElementById("hours").value);
    const result = document.getElementById("result");

    if (!subject1 || !date1 || !subject2 || !date2 || !subject3 || !date3 || !hours) {
        result.innerHTML = "<p>Please fill all the details.</p>";
        return;
    }

    const subjects = [
        { name: subject1, date: new Date(date1 + "T00:00:00") },
        { name: subject2, date: new Date(date2 + "T00:00:00") },
        { name: subject3, date: new Date(date3 + "T00:00:00") }
    ];

    // Sort subjects according to exam date
    subjects.sort((a, b) => a.date - b.date);

    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    let output = "<h2>📅 Your Day-by-Day Study Plan</h2>";

    // Give each subject exactly ONE study day
    subjects.forEach((subject, index) => {

        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + index);

        output += `
            <div class="plan">
                <h3>Day ${index + 1} - ${currentDate.toLocaleDateString()}</h3>

                <p><strong>Subject:</strong> ${subject.name}</p>

                <p><strong>Exam Date:</strong> ${subject.date.toLocaleDateString()}</p>

                <p><strong>Study Time:</strong> ${hours} hours</p>

                <label>
                    <input type="checkbox" onchange="updateProgress()">
                    Complete today's ${subject.name} study
                </label>
            </div>
        `;
    });

    output += `
        <h3>Progress: <span id="progress">0%</span></h3>
    `;

    result.innerHTML = output;
}


function updateProgress() {
    const checkboxes = document.querySelectorAll(
        "#result input[type='checkbox']"
    );

    const checked = document.querySelectorAll(
        "#result input[type='checkbox']:checked"
    );

    if (checkboxes.length === 0) {
        return;
    }

    const percentage = Math.round(
        (checked.length / checkboxes.length) * 100
    );

    document.getElementById("progress").textContent = percentage + "%";
}