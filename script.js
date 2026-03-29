let currentSubject = "";
let currentChapter = "";
let currentQ = 0;
let answers = [];
let questions = [];
let timer;
let timeLeft = 60;

const subjects = {
    Physics: ["Kinematics","Laws of Motion","Work Energy","Waves","Thermodynamics","Optics"],
    Chemistry: ["Atomic Structure","Periodic Table","Biomolecules","Electrochemistry","Organic Chemistry","Polymers"],
    Maths: ["Algebra","Probability","Vectors","Calculus","Differentiation","Trigonometry"]
};

const questionBank = {

    // PHYSICS
    "Kinematics": [
        {
            q: "A car starts from rest and accelerates uniformly at 2 m/s². What is its velocity after 5 seconds?",
            options: ["10 m/s","5 m/s","15 m/s","20 m/s"],
            ans: 0
        },
        {
            q: "The displacement-time graph is a straight line. This indicates:",
            options: ["Constant acceleration","Constant velocity","Decreasing acceleration","Zero displacement"],
            ans: 1
        },
        {
            q: "Time to reach maximum height (u=20 m/s, g=10)?",
            options: ["1 s","2 s","4 s","10 s"],
            ans: 1
        },
        {
            q: "Area under velocity-time graph represents:",
            options: ["Acceleration","Force","Displacement","Power"],
            ans: 2
        },
        {
            q: "If velocity is constant, acceleration is:",
            options: ["Zero","Constant","Increasing","Negative"],
            ans: 0
        }
    ],

    "Laws of Motion": [
        {
            q: "Passengers fall backward when bus starts. This is:",
            options: ["First law","Second law","Third law","None"],
            ans: 0
        },
        {
            q: "F = ma represents:",
            options: ["First law","Second law","Third law","Law of inertia"],
            ans: 1
        },
        {
            q: "Action and reaction are:",
            options: ["Same direction","Opposite direction","Equal only","Zero"],
            ans: 1
        },
        {
            q: "Unit of force:",
            options: ["Joule","Newton","Watt","Pascal"],
            ans: 1
        },
        {
            q: "Inertia depends on:",
            options: ["Velocity","Mass","Acceleration","Force"],
            ans: 1
        }
    ],

    "Work Energy": [
        {
            q: "If the velocity of a body is doubled, its kinetic energy becomes:",
            options: ["Double","Four times","Half","Remains same"],
            ans: 1
        },
        {
            q: "The SI unit of power is:",
            options: ["Joule","Watt","Newton","Coulomb"],
            ans: 1
        },
        {
            q: "Work done by gravity when lifting a ball upwards is:",
            options: ["Positive","Negative","Zero","Infinite"],
            ans: 1
        },
        {
            q: "If a 50 kg mass moves at 2 m/s, its kinetic energy is:",
            options: ["100 J","200 J","150 J","80 J"],
            ans: 1
        },
        {
            q: "Which of the following has only potential energy?",
            options: ["A stone at the top of a hill","A falling stone","A running athlete","Moving car"],
            ans: 0
        }
    ],
    
    "Waves": [
        {
            q: "A spring of force constant 200 N/m is stretched by 2 cm. The restoring force is:",
            options: ["2 N","4 N","0.4 N","40 N"],
            ans: 0
        },
        {
            q: "In SHM, the velocity of the particle is maximum at:",
            options: ["Extreme positions","Mean positions","Both positions","Never maximum"],
            ans: 1
        },
        {
            q: "If the frequency of a wave is 500 Hz and its wavelength is 0.7 m, what is its velocity?",
            options: ["70 m/s","350 m/s","140 m/s","280 m/s"],
            ans: 1
        },
        {
            q: "For a mass m attached to a spring (force constant k), what is the maximum acceleration in SHM of amplitude A?",
            options: ["kA/m","k/mA","A/k","mA/k"],
            ans: 0
        },
        {
            q: "Which of the following statements about resonance is correct?",
            options: ["Resonance occurs when amplitude is minimum","Resonance occurs when driving frequency equals natural frequency","Resonance never increases amplitude","Resonance makes velocity zero"],
            ans: 1
        }
    ],


    "Thermodynamics": [
        {
            q: "The equation ΔQ = ΔU + PΔV is a statement of:",
            options: ["Newton's Law","First Law of Thermodynamics","Second Law of Thermodynamics","Joule’s Law"],
            ans: 1
        },
        {
            q: "In which thermodynamic process does the temperature stay constant?",
            options: ["Isothermal","Adiabatic","Isochoric","Isobaric"],
            ans: 0
        },
        {
            q: "Which variable is held constant in Charles's Law?",
            options: ["Temperature","Volume","Pressure","Density"],
            ans: 2
        },
        {
            q: "For an adiabatic process, what is the value of heat exchanged (ΔQ)?",
            options: ["Maximum","Minimum","Zero","Equal to internal energy change"],
            ans: 2
        },
        {
            q: "Which law of thermodynamics states that energy can neither be created nor destroyed?",
            options: ["Zeroth","First","Second","Third"],
            ans: 1
        }
    ],

    "Optics": [
        {
            q: "Which color bends most when light passes through a prism?",
            options: ["Red","Voilet","Yellow","Green"],
            ans: 1
        },
        {
            q: "A person with myopia uses:",
            options: ["Concave lens","Convex lens","Cylindrical lens","Plane mirror"],
            ans: 0
        },
        {
            q: "Which of the following confirms the wave nature of light?",
            options: ["Refraction","Interference","Reflection","Absorption"],
            ans: 1
        },
        {
            q: "A convex lens of focal length 20 cm forms an image at 40 cm from the lens. The object is placed at:",
            options: ["60 cm","40 cm","30 cm","20 cm"],
            ans: 1
        },
        {
            q: "Which law states that the angle of incidence equals the angle of reflection?",
            options: ["Snell's law","Newton's law","Law of reflection","Law of refraction"],
            ans: 2
        }
    ],

    // CHEMISTRY
    "Atomic Structure": [
        {
            q: "Atomic number represents:",
            options: ["Protons","Neutrons","Electrons","Mass"],
            ans: 0
        },
        {
            q: "Electron discovered by:",
            options: ["Bohr","Rutherford","Thomson","Einstein"],
            ans: 2
        },
        {
            q: "Charge of electron:",
            options: ["+1","-1","0","+2"],
            ans: 1
        },
        {
            q: "Shape of s orbital:",
            options: ["Spherical","Linear","Planar","Cubic"],
            ans: 0
        },
        {
            q: "Max electrons in shell:",
            options: ["2n²","n²","2n","n³"],
            ans: 0
        }
    ],

    "Periodic Table": [
        {
            q: "Elements in same group have:",
            options: ["Same valency","Same mass","Same neutrons","Same energy"],
            ans: 0
        },
        {
            q: "Atomic size increases:",
            options: ["Left to right","Top to bottom","Random","None"],
            ans: 1
        },
        {
            q: "Electronegativity increases:",
            options: ["Down group","Across period","Constant","None"],
            ans: 1
        },
        {
            q: "Most reactive metals are:",
            options: ["Alkali metals","Noble gases","Halogens","Transition"],
            ans: 0
        },
        {
            q: "Valency of group 1:",
            options: ["1","2","3","4"],
            ans: 0
        }
    ],

    "Biomolecules": [
        {
            q: "Which of the following carbohydrates does not satisfy the formula Cx(H2O)y?",
            options: ["Fructose","Glucose","Deoxyribose","Lactose"],
            ans: 0
        },
        {
            q: "Identify the correct formula for the carbohydrate rhamnose?",
            options: ["C5H10O5","C6H12O5","C6H12O6"," C12H22O11"],
            ans: 1
        },
        {
            q: " Which of the following class of compounds is not a part of the large group of carbohydrates?",
            options: ["Polyamino aldehydes","Polyhalo aldehydes","Polyhydroxy ketones","Polyhydroxy carboxylic acids"],
            ans: 1
        },
        {
            q: "Which of the following carbohydrates is not a sugar?",
            options: ["Glucose","Fructose","Lactose","Cellulose"],
            ans: 3
        },
        {
            q: "Which of the following is not a polysaccharide?",
            options: ["Cellulose","Stachyose","Starch","Glycogen"],
            ans: 1
        }
    ],

    "Electrochemistry": [
        {
            q: "An electrochemical cell generally consists of a cathode and an anode. Which of the following statements is correct with respect to the cathode?",
            options: ["Oxidation occurs at the cathode","Electrons move into the cathode","Usually denoted by a negative sign","Is usually made up of insulating material"],
            ans: 1
        },
        {
            q: "When equilibrium is reached inside the two half-cells of the electrochemical cells, what is the net voltage across the electrodes?",
            options: [">1","<1","=0","Not defined"],
            ans: 2
        },
        {
            q: "Which of the following factors does not affect the electrode potential of an electrode?",
            options: ["Nature of the electrode (metal)","Temperature of the solution","Molarity of the solution","Size of the electrode"],
            ans: 3
        },
        {
            q: "Which of the following is not a type of electrochemical cell?",
            options: ["Voltaic cell","Photovoltaic cell","Electrolytic cell","Fuel cell"],
            ans: 1
        },
        {
            q: "Which of the following is a not a secondary cell?",
            options: ["Ni-Cd cell","Lead storage cell","Hg cell","Leclanche cell"],
            ans: 3
        }
    ],

    "Organic Chemistry": [
        {
            q: "Which of the following is the simplest member of organic compounds?",
            options: ["Formic acid","Formaldehyde","Methane","Methanol"],
            ans: 2
        },
        {
            q: "Which of the following is yielded when Ethylene glycol is treated with phosphorus tri-iodide?",
            options: ["ethylene di-iodide","ethylene","ethane","ethyl iodide"],
            ans: 1
        },
        {
            q: "Hydrocarbons are organic compounds with element __________",
            options: ["Both hydrogen and carbon","Carbon","Hydrogen","Oxygen"],
            ans: 0
        },
        {
            q: "Which of the following bond is made up of a large number of organic compounds?",
            options: ["Metallic bond","Dipolar bond","Ionic bond","Covalent bond"],
            ans: 3
        },
        {
            q: "Which of the following is not a class of organic compounds?",
            options: ["Amides","Electro compounds","Nitro compound","Carbonyl compound"],
            ans: 1
        }
    ],

    "Polymers": [
        {
            q: "Which of the following is a co-polymer?",
            options: ["Polythene","Bakelite","PVC","Polyacrylonitrile"],
            ans: 1
        },
        {
            q: "Polymers are not classified on the basis of which of the following?",
            options: ["Source","Number of monomers","Method od preparation","Structure"],
            ans: 2
        },
        {
            q: "Which of the following types of polymers is not based on the classification by the source?",
            options: ["Natural","Semi-synthetic","Elastomers","Synthetic"],
            ans: 2
        },
        {
            q: "Which of the following is not a natural polymer?",
            options: ["Rayon","Starch","Cellulose","RNA"],
            ans: 0
        },
        {
            q: "The synthesis of which of the following polymers involves the repeated loss of small molecules?",
            options: ["Polythene","Buna-S","Buna-N","Nylon-6,6"],
            ans: 3
        }
    ],

    // MATHS
    "Algebra": [
        {
            q: "Solve: 2x = 10",
            options: ["2","5","10","20"],
            ans: 1
        },
        {
            q: "(a+b)² = ?",
            options: ["a²+b²","a²+2ab+b²","a²-b²","None"],
            ans: 1
        },
        {
            q: "x² when x=4:",
            options: ["8","16","4","12"],
            ans: 1
        },
        {
            q: "Factorization of x²-9:",
            options: ["(x+3)(x-3)","(x+9)(x-1)","x²","None"],
            ans: 0
        },
        {
            q: "Degree of 3x³:",
            options: ["1","2","3","4"],
            ans: 2
        }
    ],

    "Probability": [
        {
            q: "What is the probability of an impossible event?",
            options: ["1","0","Insufficient data","Not defined"],
            ans: 1
        },
        {
            q: "What does probability mean?",
            options: ["The total number of possible outcomes in an event","The ratio of favorable outcomes to all outcomes", "The chance of an event happening", "How certain an event will occur"],
            ans: 1
        },
        {
            q: "What’s the probability of drawing a red card or a card with a face (king, queen, or jack) from a standard deck of 52 cards?",
            options: ["13/52","21/52","29/52","8/13"],
            ans: 1
        },
        {
            q: "Two unbiased coins are tossed. What is the probability of getting at most one head?",
            options: ["3/4","1/6","1/3","1/2"],
            ans: 0
        },
        {
            q: "Company A produces 10% defective products, Company B produces 20% defective products and C produces 5% defective products. If choosing a company is an equally likely event, then find the probability that the product chosen is defective.",
            options: ["0.11","0.21","0.22","0.12"],
            ans: 2
        }
    ],

    "Vectors": [
        {
            q: "Two vectors having the same initial points are called as ________________",
            options: ["collinear vectors","unit vectors","coinitial vectors","equal vectors"],
            ans: 2
        },
        {
            q: "Which of the following is the condition for two vectors to be Collinear?",
            options: ["The vectors should be parallel to the same line", "The vectors should have the same initial point", "The vectors should have the same magnitude","The vectors should have the magnitude 1 and 0 respectively"],
            ans: 0
        },
        {
            q: "The vector whose initial and final points coincide is called ____________",
            options: ["unit vector","coinitial vectors","equal vectors","zero vector"],
            ans: 3
        },
        {
            q: "The vector perpendicular to both i and j is:",
            options: ["i","j","k","i+j"],
            ans: 2
        },
        {
            q: "If a × b = 0, then vectors are:",
            options: ["Parallel","Perpendicular","Equal","Zero"],
            ans: 0
        }
    ],

    "Calculus": [
        {
            q: "If f(x) = x², then f'(x) is:",
            options: ["x","2x","x²","2"],
            ans: 1
        },
        {
            q: "Derivative of cosx is:",
            options: ["sinx","-sinx","cosx","-cosx"],
            ans: 1
        },
        {
            q: "Derivative of ln(x) is:",
            options: ["1/x","x","ln(x)","e^x"],
            ans: 0
        },
        {
            q: "∫ x dx =",
            options: ["x²/2 + C","x + C","1/x + C","x² + C"],
            ans: 0
        },
        {
            q: "If dy/dx > 0, function is:",
            options: ["Decreasing","Constant","Increasing","Zero"],
            ans: 2
        }
    ],

    "Differentiation": [
        {
            q: "If y = x², then dy/dx is:",
            options: ["x","2x","x²","2"],
            ans: 1
        },
        {
            q: "If y = x³, then dy/dx is:",
            options: ["3x²","x²","x³","3x"],
            ans: 0
        },
        {
            q: "If y = sin(x) + cos(x), then dy/dx is:",
            options: ["cos(x) - sin(x)","sin(x) + cos(x)","cos(x) + sin(x)","-cos(x) + sin(x)"],
            ans: 0
        },
        {
            q: "If f(x) = xⁿ, then f'(x) =",
            options: ["nxⁿ⁻¹","xⁿ⁺¹","nxⁿ","xⁿ⁻¹"],
            ans: 0
        },
        {
            q: "If y = √x, then dy/dx is:",
            options: ["1/(2√x)","√x","2√x","1/x"],
            ans: 0
        }
    ],

    "Trigonometry": [
        {
            q: "sin²θ + cos²θ = ?",
            options: ["1","0","2","-1"],
            ans: 0
        },
        {
            q: "tanθ = ?",
            options: ["sin/cos","cos/sin","1/sin","None"],
            ans: 0
        },
        {
            q: "sin 90° = ?",
            options: ["0","1","-1","Undefined"],
            ans: 1
        },
        {
            q: "cos 0° = ?",
            options: ["0","1","-1","Undefined"],
            ans: 1
        },
        {
            q: "tan 45° = ?",
            options: ["0","1","-1","∞"],
            ans: 1
        }
    ]

};

function showPage(id) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

function selectSubject(sub) {
    currentSubject = sub;
    document.getElementById("subjectTitle").innerText = sub;

    let grid = document.getElementById("chapterGrid");
    grid.innerHTML = "";

    subjects[sub].forEach(ch => {
        let div = document.createElement("div");
        div.className = "card";
        div.innerText = ch;
        div.onclick = () => startTest(ch);
        grid.appendChild(div);
    });

    showPage("chapters");
}

function startTest(ch) {
    currentChapter = ch;
    currentQ = 0;
    answers = [];

    questions = questionBank[ch];

    if (!questions) {
        alert("No questions available!");
        return;
    }

    document.getElementById("chapterTitle").innerText = ch;

    startTimer();
    loadQuestion();
    showPage("test");
}

function startTimer() {
    clearInterval(timer);
    timeLeft = 60;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = "Time Left: " + timeLeft + "s";

        if (timeLeft <= 0) {
            clearInterval(timer);
            submitTest();
        }
    }, 1000);
}

function loadQuestion() {
    let q = questions[currentQ];

    document.getElementById("questionText").innerText = q.q;
    document.getElementById("progress").innerText =
        `Question ${currentQ + 1} of ${questions.length}`;

    let optDiv = document.getElementById("options");
    optDiv.innerHTML = "";

    q.options.forEach((opt, i) => {
        let btn = document.createElement("button");
        btn.innerText = opt;

        if (answers[currentQ] === i) btn.classList.add("selected");

        btn.onclick = () => {
            answers[currentQ] = i;
            loadQuestion();
        };

        optDiv.appendChild(btn);
    });

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const submitBtn = document.getElementById("submitBtn");

if (currentQ === 0) {
    prevBtn.style.display = "none";
} else {
    prevBtn.style.display = "inline-block";
}

if (currentQ === questions.length - 1) {
    nextBtn.style.display = "none";
    submitBtn.style.display = "inline-block";
} else {
    nextBtn.style.display = "inline-block";
    submitBtn.style.display = "none";
}

}

function nextQuestion() {
    if (currentQ < questions.length - 1) {
        currentQ++;
        loadQuestion();
    }
}

function prevQuestion() {
    if (currentQ > 0) {
        currentQ--;
        loadQuestion();
    }
}

function submitTest() {
    clearInterval(timer);

    let score = 0;
    questions.forEach((q, i) => {
        if (answers[i] === q.ans) score++;
    });

    let percent = ((score / questions.length) * 100).toFixed(2);

    document.getElementById("scoreText").innerText =
        `Score: ${score}/${questions.length} (${percent}%)`;

    showPage("result");
}

function goHome() {
    clearInterval(timer);
    showPage("home");
}