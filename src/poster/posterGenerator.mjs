import fs from "fs";
import process from "process";
import path from "path";
import ejs from "ejs";
import wkhtmltopdf from "wkhtmltopdf";

const ejsOptions = {
    views: ["templates"]
};

ejs.fileLoader = customFileLoader;

const defaultOptions = {
    entriesPerRow: 20
};

function generatePoster(options, outputPipe) {
    let data = {
        kanjiData: []
    };

    for (let i = 0; i < 50; i++) {
        data.kanjiData.push({
            kanji: "test" + i,
            romaji: "romaji" + i
        });
    }

    data = {
        ...data,
        ...options.data
    };

    console.log("opt", options);

    ejs.renderFile(
        "main.ejs",
        data,
        {
            ...ejsOptions,
            ...options.ejsOptions
        },
        (err, res) => {
            if (err) {
                throw err;
            }

            console.log("res", res);
            const tempPath = path.join(process.cwd(), "temp", "out-" + Date.now() + ".pdf");
            wkhtmltopdf(res, {}).pipe(outputPipe);


        }
    );
}

function customFileLoader(fileName) {
    const filePath = path.join(process.cwd(), "templates", fileName);

    console.log("Load ejs file", filePath);

    return fs.readFileSync(filePath);
}

export default {
    generatePoster
};
