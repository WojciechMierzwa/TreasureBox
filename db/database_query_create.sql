DROP TABLE IF EXISTS episode;
DROP TABLE IF EXISTS TVShow;
DROP TABLE IF EXISTS AppUserFilm;
DROP TABLE IF EXISTS AppUser;
DROP TABLE IF EXISTS Film;

CREATE TABLE AppUser
    (
     id SERIAL PRIMARY KEY,
	 role TEXT DEFAULT 'user' NOT NULL,
     name TEXT NOT NULL, 
     password TEXT NOT NULL, 
     profile_picture INTEGER NOT NULL,   
     require_credentials BOOLEAN NOT NULL
    );

CREATE TABLE Film 
    (
     id SERIAL PRIMARY KEY,
     name TEXT NOT NULL, 
     duration INTEGER NOT NULL, 
     film_location TEXT NOT NULL, 
     has_captions BOOLEAN NOT NULL, 
     captions_location TEXT, 
     media_type TEXT NOT NULL, 
     genre TEXT
    );

CREATE TABLE TVShow 
    (
     id SERIAL PRIMARY KEY, 
     season_count INTEGER NOT NULL, 
     episodes_count INTEGER NOT NULL, 
     Film_id INTEGER NOT NULL,
     FOREIGN KEY (Film_id) REFERENCES Film(id)
    );

CREATE TABLE episode (
    id SERIAL PRIMARY KEY,
    season_number INTEGER NOT NULL,
    episode_number INTEGER NOT NULL,
    name TEXT NOT NULL,
    duration INTEGER NOT NULL,
    episode_location TEXT NOT NULL,
    has_captions BOOLEAN NOT NULL,
    captions_location TEXT,
    tvshow_id INTEGER NOT NULL,
    FOREIGN KEY (tvshow_id) REFERENCES tvshow(id)
);

CREATE TABLE AppUserFilm 
    (
     id SERIAL PRIMARY KEY,
	 film_state INTEGER DEFAULT 0,
     AppUser_id INTEGER NOT NULL, 
     Film_id INTEGER NOT NULL,
     FOREIGN KEY (Film_id) REFERENCES Film(id),
     FOREIGN KEY (AppUser_id) REFERENCES AppUser(id)
    );
