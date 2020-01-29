const Imap = require("imap");

const imap = new Imap({
  user: "edward@foxdealer.com",
  password: "insavdtgdqbzrkwd",
  host: "imap.gmail.com",
  port: 993,
  tls: true
});

export const checkEmail = async () => {
  return new Promise((resolve, reject) => {
    imap.once("ready", function() {
      imap.openBox("ELMS", true, function(err, box) {
        if (err) throw err;
        imap.search(["UNSEEN"], function(err, results) {
          imap.setFlags(results, ["\\Seen"], function(err) {
            if (!err) {
            } else {
            }
          });

          const f = imap.fetch(results[results.length - 1], {
            bodies: "TEXT",
            struct: true
          });
          let emailContent = "";
          f.on("message", function(msg, seqno) {
            msg.on("body", function(stream, info) {
              stream.on("data", function(chunk) {
                emailContent += chunk.toString("utf8");
              });
              stream.once("end", function() {});
            });
            msg.once("end", function() {});
          });
          f.once("error", function(err) {
            console.error("IMAP Fetch error: " + err);
          });
          f.once("end", function() {
            imap.end();
            const regex = /Hi, your resquested PIN is: (\d+) it will expire in 30 Minutes/gm;
            let m;
            while ((m = regex.exec(emailContent)) !== null) {
              if (m.index === regex.lastIndex) {
                regex.lastIndex++;
              }
              m.forEach((match, groupIndex) => {
                if (groupIndex === 1) {
                  return resolve(match);
                }
              });
            }
          });
        });
      });
    });

    imap.once("error", function(err) {
      console.log(err);
    });

    imap.once("end", function() {
      console.log("Connection ended");
    });

    imap.connect();
  });
};
