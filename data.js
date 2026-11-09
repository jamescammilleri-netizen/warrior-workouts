// Starter workouts. Chest Day follows the @muscleandhealth post (Sept 30, 2026) as written.
// Each workout uses the same simple format so new ones can be added or imported as JSON.
window.STARTER_WORKOUTS = [
  {
    id: "chest-day", cover: "media/still-1-bench.jpg",
    title: "Chest Day",
    subtitle: "Complete Upper-Body Push Workout",
    tag: "Push",
    tagline: "Your chest is the first thing people see. Train it like it.",
    exercises: [
      { name: "Barbell Bench Press", media: "media/ex-1-bench", cues: ["Retract your shoulder blades, keep feet planted and lower to the lower chest", "Press explosively with a tight torso and controlled elbows"],    sets: "3-4", reps: "5-8",   rest: 150 },
      { name: "Incline Dumbbell Press", media: "media/ex-2-incline", cues: ["Set the bench around 30 degrees and pin your shoulder blades down", "Press up and slightly in, then lower slowly into a deep stretch"], sets: "3-4", reps: "6-10",  rest: 120 },
      { name: "Weighted Dip", media: "media/ex-3-dip", cues: ["Lean slightly forward and let the chest stretch at the bottom", "Drive up without shrugging and keep tension on the pecs"],           sets: "3",   reps: "6-10",  rest: 120 },
      { name: "Seated Machine Press", media: "media/ex-4-machine", cues: ["Set the seat so the handles start at mid-chest", "Use a full range and control the lowering phase"],   sets: "3",   reps: "8-12",  rest: 90 },
      { name: "Incline Cable Fly", media: "media/ex-5-cablefly", cues: ["Set the pulleys low and bring the handles up in a hugging arc", "Keep a soft elbow bend and squeeze the upper chest at the top"],      sets: "3",   reps: "10-15", rest: 75 },
      { name: "Cable Crossover", media: "media/ex-6-crossover", cues: ["Lean slightly forward and sweep the hands down and together", "Return slowly to the stretch and keep constant tension"],        sets: "2-3", reps: "12-15", rest: 60 },
      { name: "Push-Up", media: "media/ex-7-pushup", cues: ["Straight line from head to heels, hands just outside shoulders", "Lower under control, press hard, do not let the hips sag"],                sets: "2-3", reps: "AMRAP", rest: 60, bodyweight: true }
    ],
    science: "A 30-degree incline shifts the work to your upper chest, while flat pressing spreads it across the whole pec (Lauver et al., 2016). Moderate and heavy loads build similar muscle when sets are pushed close to failure (Schoenfeld et al., 2015). Angle plus effort.",
    references: [
      { label: "Lauver JD et al. Eur J Sport Sci. 2016. PMID 25799093", url: "https://pubmed.ncbi.nlm.nih.gov/25799093/" },
      { label: "Schoenfeld BJ et al. J Strength Cond Res. 2015. PMID 25853914", url: "https://pubmed.ncbi.nlm.nih.gov/25853914/" }
    ],
    note: "Run once a week as written. Pair it with a pull day for balance.",
    source: "Adapted from @muscleandhealth"
  },
  {
    id: "pull-day",
    title: "Pull Day",
    subtitle: "Complete Back & Biceps Workout",
    tag: "Pull",
    tagline: "The balance to chest day. Build the back that holds it all up.",
    exercises: [
      { name: "Weighted Pull-Up", media: "media/ex-p1-pullup", cues: ["Start from a dead hang, pull your chest toward the bar", "Lower all the way down under control"], sets: "3-4", reps: "5-8", rest: 150 },
      { name: "Barbell Row", media: "media/ex-p2-row", cues: ["Hinge to about 45 degrees with a flat back", "Row to the lower ribs and squeeze the shoulder blades"], sets: "3-4", reps: "6-10", rest: 120 },
      { name: "Chest-Supported Row", media: "media/ex-p3-csrow", cues: ["Chest stays on the pad, no swinging", "Drive the elbows back toward the hips"], sets: "3", reps: "8-12", rest: 90 },
      { name: "Lat Pulldown", media: "media/ex-p4-pulldown", cues: ["Overhand grip just outside the shoulders", "Pull to the upper chest, elbows down and back"], sets: "3", reps: "10-12", rest: 90 },
      { name: "Face Pull", media: "media/ex-p5-facepull", cues: ["Rope at face height, elbows high and wide", "Pull the rope apart as it reaches your face"], sets: "3", reps: "12-15", rest: 60 },
      { name: "Incline Dumbbell Curl", media: "media/ex-p6-incurl", cues: ["Lean back so the arms hang behind the body", "Keep the upper arms still and curl from a full stretch"], sets: "3", reps: "10-12", rest: 60 },
      { name: "Hammer Curl", media: "media/ex-p7-hammer", cues: ["Neutral grip, palms facing each other", "Elbows pinned at your sides, no swinging"], sets: "2-3", reps: "12-15", rest: 60 }
    ],
    science: "Vertical pulls bias the lats, horizontal rows bias the mid-back. Using both covers the whole back, the same angle logic as chest day. Take sets close to failure.",
    references: [],
    note: "Starter companion to Chest Day. Edit freely.",
    source: "Warrior Workouts starter"
  },
  {
    id: "back-day",
    title: "Back Day",
    subtitle: "Complete Back Workout",
    tag: "Back",
    tagline: "A wide back is built, not born.",
    cover: "media/still-b1-deadlift.jpg",
    exercises: [
      { name: "Deadlift", media: "media/ex-b1-deadlift", cues: ["Bar over mid-foot, flat back, chest up", "Push the floor away and lock out with the hips"], sets: "3-4", reps: "5-8", rest: 180 },
      { name: "Pull-Up", media: "media/ex-b2-pullup", cues: ["Overhand grip, start from a dead hang", "Pull the chest to the bar, lower under control"], sets: "3-4", reps: "AMRAP", rest: 120, bodyweight: true },
      { name: "Lat Pulldown", media: "media/ex-p4-pulldown", cues: ["Keep the grip overhand (pronated) for more lat work", "Pull to the upper chest, elbows down and back"], sets: "3", reps: "8-12", rest: 90 },
      { name: "Seated Cable Row", media: "media/ex-b4-cablerow", cues: ["Sit tall, do not rock the torso", "Row to the belly and squeeze the shoulder blades"], sets: "3", reps: "8-12", rest: 90 },
      { name: "Face Pull", media: "media/ex-p5-facepull", cues: ["Rope at face height, elbows high and wide", "Pull the rope apart as it reaches your face"], sets: "3", reps: "12-15", rest: 60 },
      { name: "Straight-Arm Pulldown", media: "media/ex-b6-straightarm", cues: ["Arms straight, slight forward hinge", "Sweep the bar down to the thighs using the lats"], sets: "3", reps: "12-15", rest: 60 }
    ],
    science: "Grip changes what your back does. An overhand (pronated) grip on the pulldown produces more lat activation than an underhand grip, which shifts work to the biceps (Lusk et al., 2010). Head to head, the wide-grip pulldown and the seated row produced the highest lat activation of the classic back exercises (Lehman et al., 2004). Grip plus exercise selection.",
    references: [
      { label: "Lusk SJ et al. J Strength Cond Res. 2010. PMID 20543740", url: "https://pubmed.ncbi.nlm.nih.gov/20543740/" },
      { label: "Lehman GJ et al. Dyn Med. 2004. PMID 15228624", url: "https://pubmed.ncbi.nlm.nih.gov/15228624/" }
    ],
    note: "Run once a week as written. Pair it with a push day for balance.",
    source: "Adapted from @muscleandhealth"
  },
  {
    "id": "shoulder-day",
    "title": "Shoulder Day",
    "subtitle": "Full Workout, Every Head Covered",
    "tag": "Shoulders",
    "tagline": "Front, side and rear delts plus traps in one session.",
    "exercises": [
      {
        "name": "Seated Smith Press",
        "media": "media/ex-s1-smith",
        "cues": [
          "Bar starts at upper-chest height",
          "Press straight up and lower under control"
        ],
        "sets": "3-4",
        "reps": "6-10",
        "rest": 120
      },
      {
        "name": "Lateral Raise",
        "media": "media/ex-s2-lateral",
        "cues": [
          "Lead with the elbows, slight bend",
          "Stop at shoulder height, no swinging"
        ],
        "sets": "3-4",
        "reps": "10-15",
        "rest": 60
      },
      {
        "name": "Arnold Press",
        "media": "media/ex-s3-arnold",
        "cues": [
          "Start palms facing you",
          "Rotate as you press, reverse on the way down"
        ],
        "sets": "3-4",
        "reps": "8-12",
        "rest": 90
      },
      {
        "name": "Front Raise",
        "media": "media/ex-s4-front",
        "cues": [
          "Raise to shoulder height, arms nearly straight",
          "Lower slowly, keep the torso still"
        ],
        "sets": "3-4",
        "reps": "12-15",
        "rest": 60
      },
      {
        "name": "Rear Delt Fly",
        "media": "media/ex-s5-reardelt",
        "cues": [
          "Hinge forward with a flat back",
          "Sweep the arms wide and squeeze the rear delts"
        ],
        "sets": "3-4",
        "reps": "12-15",
        "rest": 60
      },
      {
        "name": "Face Pull",
        "media": "media/ex-p5-facepull",
        "cues": [
          "Rope at face height, elbows high and wide",
          "Pull the rope apart as it reaches your face"
        ],
        "sets": "3-4",
        "reps": "12-15",
        "rest": 60
      },
      {
        "name": "Dumbbell Shrug",
        "media": "media/ex-s7-shrug",
        "cues": [
          "Shrug straight up toward the ears",
          "Pause at the top, no rolling"
        ],
        "sets": "3-4",
        "reps": "10-15",
        "rest": 60
      }
    ],
    "science": "",
    "references": [],
    "note": "Save this for your next shoulder day.",
    "source": "Adapted from @muscleandhealth"
  },
  {
    "id": "arm-day",
    "title": "Arm Day",
    "subtitle": "Complete Arm Workout",
    "tag": "Arms",
    "tagline": "Bigger arms are built from both sides.",
    "exercises": [
      {
        "name": "Alternating Dumbbell Curl",
        "media": "media/ex-a1-altcurl",
        "cues": [
          "Elbows pinned at your sides",
          "Squeeze at the top, lower slowly"
        ],
        "sets": "3-4",
        "reps": "8-12 each arm",
        "rest": 60
      },
      {
        "name": "Rope Hammer Curl",
        "media": "media/ex-a2-ropehammer",
        "cues": [
          "Neutral grip on the rope",
          "Curl to the chest without swinging"
        ],
        "sets": "3",
        "reps": "10-12",
        "rest": 60
      },
      {
        "name": "EZ-Bar Preacher Curl",
        "media": "media/ex-a3-preacher",
        "cues": [
          "Upper arms flat on the pad",
          "Lower all the way to a full stretch"
        ],
        "sets": "3",
        "reps": "10-12",
        "rest": 75
      },
      {
        "name": "Tricep Rope Pushdown",
        "media": "media/ex-a4-pushdown",
        "cues": [
          "Elbows locked at your sides",
          "Spread the rope at the bottom"
        ],
        "sets": "3-4",
        "reps": "10-15",
        "rest": 60
      },
      {
        "name": "Overhead Rope Tricep Extension",
        "media": "media/ex-a5-overheadrope",
        "cues": [
          "Elbows point up, lower behind the head",
          "Extend fully for the long-head stretch"
        ],
        "sets": "3",
        "reps": "10-12",
        "rest": 75
      },
      {
        "name": "EZ-Bar Overhead French Press",
        "media": "media/ex-a6-french",
        "cues": [
          "Keep elbows narrow and pointing up",
          "Lower slowly behind the head"
        ],
        "sets": "3",
        "reps": "8-12",
        "rest": 90
      }
    ],
    "science": "Where your upper arm sits changes what the triceps do. Training overhead grew the whole triceps 1.4x more than the same movement with arms at the sides over 12 weeks, with the long head growing 1.5x more (Maeo et al., 2023). That is why two overhead extensions sit next to the pushdown. Stretch plus squeeze.",
    "references": [
      {
        "label": "Maeo S et al. Eur J Sport Sci. 2023. PMID 35819335",
        "url": "https://pubmed.ncbi.nlm.nih.gov/35819335/"
      }
    ],
    "note": "Save this for your next arm day.",
    "source": "Adapted from @muscleandhealth"
  },
  {
    "id": "leg-day",
    "title": "Leg Day",
    "subtitle": "Complete Lower-Body Workout",
    "tag": "Legs",
    "tagline": "Your legs are half your body. Train them like it.",
    "exercises": [
      {
        "name": "Back Squat",
        "media": "media/ex-l1-squat",
        "cues": [
          "Brace hard, chest up",
          "Sit to full depth, drive up through mid-foot"
        ],
        "sets": "3-4",
        "reps": "5-8",
        "rest": 180
      },
      {
        "name": "Romanian Deadlift",
        "media": "media/ex-l2-rdl",
        "cues": [
          "Push the hips back, soft knees",
          "Keep the bar close, feel the hamstrings stretch"
        ],
        "sets": "3-4",
        "reps": "6-10",
        "rest": 120
      },
      {
        "name": "Leg Press",
        "media": "media/ex-l3-legpress",
        "cues": [
          "Lower until knees are deeply bent",
          "Do not lock out hard at the top"
        ],
        "sets": "3-4",
        "reps": "8-15",
        "rest": 120
      },
      {
        "name": "Bulgarian Split Squat",
        "media": "media/ex-l4-bss",
        "cues": [
          "Rear foot on the bench, long stride",
          "Drive through the full front foot"
        ],
        "sets": "3",
        "reps": "8-12 each leg",
        "rest": 90
      },
      {
        "name": "Leg Extension",
        "media": "media/ex-l5-legext",
        "cues": [
          "Squeeze the quads at the top",
          "Lower slowly, no swinging"
        ],
        "sets": "2-3",
        "reps": "10-15",
        "rest": 60
      },
      {
        "name": "Seated Leg Curl",
        "media": "media/ex-l6-legcurl",
        "cues": [
          "Hips pinned to the seat",
          "Curl fully and control the return"
        ],
        "sets": "2-3",
        "reps": "10-15",
        "rest": 60
      },
      {
        "name": "Standing Calf Raise",
        "media": "media/ex-l7-calf",
        "cues": [
          "Deep stretch at the bottom",
          "Pause at the top of every rep"
        ],
        "sets": "3-4",
        "reps": "8-15",
        "rest": 60
      }
    ],
    "science": "Lifters squatting to full depth gained significantly more lower-body muscle than half-squatters (Kubo et al., 2019). And multiple sets beat single sets for growth in a clear dose response (Krieger, 2010). Depth plus volume.",
    "references": [
      {
        "label": "Kubo K et al. Eur J Appl Physiol. 2019. PMID 31230110",
        "url": "https://pubmed.ncbi.nlm.nih.gov/31230110/"
      },
      {
        "label": "Krieger JW. J Strength Cond Res. 2010. PMID 20300012",
        "url": "https://pubmed.ncbi.nlm.nih.gov/20300012/"
      }
    ],
    "note": "Run once a week as written. If your legs recover fast, split it across two days.",
    "source": "Adapted from @muscleandhealth"
  },
  {
    "id": "glute-day",
    "title": "Glute Day",
    "subtitle": "Complete Glute Workout",
    "tag": "Glutes",
    "tagline": "Six exercises, full breakdown on every slide.",
    "cover": "media/still-g1-hipthrust.jpg",
    "exercises": [
      {
        "name": "Barbell Hip Thrust",
        "media": "media/ex-g1-hipthrust",
        "cues": [
          "Drive through the heels and keep the ribs down",
          "Squeeze the glutes hard at lockout"
        ],
        "sets": "3-4",
        "reps": "8-12",
        "rest": 120
      },
      {
        "name": "Romanian Deadlift",
        "media": "media/ex-g2-rdl",
        "cues": [
          "Push the hips back and keep the bar close",
          "Squeeze the glutes to stand tall"
        ],
        "sets": "3-4",
        "reps": "6-10",
        "rest": 120
      },
      {
        "name": "Bulgarian Split Squat",
        "media": "media/ex-g3-bss",
        "cues": [
          "Take a long stride and lean slightly forward",
          "Drive through the full front foot"
        ],
        "sets": "3",
        "reps": "8-12 each leg",
        "rest": 90
      },
      {
        "name": "Cable Kickback",
        "media": "media/ex-g4-kickback",
        "cues": [
          "Keep the hips square and kick back smoothly",
          "Pause at peak contraction"
        ],
        "sets": "2-3",
        "reps": "12-15 each leg",
        "rest": 60
      },
      {
        "name": "Smith Machine Reverse Lunge",
        "media": "media/ex-g5-reverselunge",
        "cues": [
          "Step back long enough to load the glute",
          "Drive through the front heel"
        ],
        "sets": "3",
        "reps": "8-10 each leg",
        "rest": 90
      },
      {
        "name": "Seated Hip Abduction",
        "media": "media/ex-g6-abduction",
        "cues": [
          "Sit tall and drive the knees outward",
          "Pause at full abduction"
        ],
        "sets": "2-3",
        "reps": "12-20",
        "rest": 60
      }
    ],
    "science": "",
    "references": [],
    "note": "Save this for your next glute session.",
    "source": "Adapted from @muscleandhealth"
  },
  {
    "id": "core-day",
    "title": "Core Day",
    "subtitle": "Complete Ab & Core Workout",
    "tag": "Core",
    "tagline": "Train abs like any other muscle. Load them and progress the weight.",
    "exercises": [
      {
        "name": "Cable Crunch",
        "media": "media/ex-c1-cablecrunch",
        "cues": [
          "Hips stay still, crunch ribs to hips",
          "Squeeze the abs, rise slowly"
        ],
        "sets": "3",
        "reps": "12-15",
        "rest": 60
      },
      {
        "name": "Hanging Leg Raise",
        "media": "media/ex-c2-legraise",
        "cues": [
          "No swinging, start from a dead hang",
          "Raise to hip height or higher"
        ],
        "sets": "3",
        "reps": "10-12",
        "rest": 60
      },
      {
        "name": "Ab Wheel Rollout",
        "media": "media/ex-c3-abwheel",
        "cues": [
          "Tuck the pelvis, keep the back flat",
          "Roll out only as far as you can control"
        ],
        "sets": "3",
        "reps": "8-12",
        "rest": 75,
        "bodyweight": true
      },
      {
        "name": "Weighted Russian Twist",
        "media": "media/ex-c4-russian",
        "cues": [
          "Lean back, feet off the floor",
          "Rotate the torso, not just the arms"
        ],
        "sets": "3",
        "reps": "12-15 each side",
        "rest": 60
      },
      {
        "name": "Decline Weighted Sit-Up",
        "media": "media/ex-c5-declinesitup",
        "cues": [
          "Hold the plate on your chest",
          "Curl up and lower slowly"
        ],
        "sets": "3",
        "reps": "10-12",
        "rest": 60
      }
    ],
    "science": "A thousand crunches will not burn the fat over your abs. Six weeks of ab training changed nothing about abdominal fat (Vispute et al., 2011). The fat comes off through energy balance; this builds the muscle that shows once it is gone.",
    "references": [
      {
        "label": "Vispute SS et al. J Strength Cond Res. 2011. PMID 21804427",
        "url": "https://pubmed.ncbi.nlm.nih.gov/21804427/"
      }
    ],
    "note": "2 to 3 times a week.",
    "source": "Adapted from @muscleandhealth"
  }
];
(() => { const order = ['chest-day','back-day','shoulder-day','arm-day','leg-day','glute-day','core-day','pull-day'];
  window.STARTER_WORKOUTS.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id)); })();
