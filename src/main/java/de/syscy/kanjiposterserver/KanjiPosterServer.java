package de.syscy.kanjiposterserver;

import org.takes.facets.fork.FkRegex;
import org.takes.facets.fork.TkFork;
import org.takes.http.Exit;
import org.takes.http.FtBasic;

import java.io.IOException;
import java.sql.Time;

public class KanjiPosterServer {
    public static void main(String[] args) throws IOException {
        FtBasic httpServer = new FtBasic(new TkFork(new FkRegex("/", "Wow " + String.valueOf(System.currentTimeMillis()))), 8080);
        httpServer.start(Exit.NEVER);
    }
}