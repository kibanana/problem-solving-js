// 중복된 문장인지를 판별하기 위해 Set 자료구조를 사용하였습니다.

const sentences = [
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
    "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.",
    "Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
];
const sentenceSet = new Set();
let duplicatedSentences = [];

for (let i = 0; i < sentences.length; i++) {
    sentenceSet.add(sentences[i]);

    if ((i + 1) !== (sentenceSet.size + duplicatedSentences.length)) {
        duplicatedSentences.push(i);
    }
}

duplicatedSentences.map(index => {
    console.log(index, `${sentences[index]}`);
});

// output:

// 3 Lorem Ipsum is simply dummy text of the printing and typesetting industry.
// 8 It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.