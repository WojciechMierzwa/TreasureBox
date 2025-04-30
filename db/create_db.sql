-- Usuwanie tabel w poprawnej kolejności ze względu na zależności
DROP TABLE IF EXISTS app_user_episode;
DROP TABLE IF EXISTS episode;
DROP TABLE IF EXISTS season;
DROP TABLE IF EXISTS app_user_film;
DROP TABLE IF EXISTS app_user_series;
DROP TABLE IF EXISTS series;
DROP TABLE IF EXISTS film;
DROP TABLE IF EXISTS app_user;

-- Tabela użytkowników
CREATE TABLE app_user (
    id SERIAL PRIMARY KEY,
    role TEXT NOT NULL DEFAULT 'user',
    name TEXT NOT NULL,
    password TEXT NOT NULL,
    profile_picture INTEGER NOT NULL,
    require_credentials BOOLEAN NOT NULL
);

-- Tabela filmów
CREATE TABLE film (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    duration INTEGER NOT NULL,
    film_location TEXT NOT NULL,
    has_captions BOOLEAN NOT NULL,
    captions_location TEXT,
    genre TEXT
);

-- Tabela seriali
CREATE TABLE series (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    genre TEXT NOT NULL,
    picture TEXT,
    season_count INTEGER,
    episodes_count INTEGER
);

-- Tabela relacji użytkownik-serial
CREATE TABLE app_user_series (
    id SERIAL PRIMARY KEY,
    series_id INTEGER NOT NULL,
    app_user_id INTEGER NOT NULL,
    FOREIGN KEY (series_id) REFERENCES series(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (app_user_id) REFERENCES app_user(id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- Tabela relacji użytkownik-film
CREATE TABLE app_user_film (
    id SERIAL PRIMARY KEY,
    time_watched INTEGER,
    app_user_id INTEGER NOT NULL,
    film_id INTEGER NOT NULL,
    FOREIGN KEY (app_user_id) REFERENCES app_user(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (film_id) REFERENCES film(id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- Tabela sezonów
CREATE TABLE season (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    series_id INTEGER NOT NULL,
    FOREIGN KEY (series_id) REFERENCES series(id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- Tabela odcinków
CREATE TABLE episode (
    id SERIAL PRIMARY KEY,
    season_number INTEGER NOT NULL,
    episode_number INTEGER NOT NULL,
    name TEXT,
    duration INTEGER,
    episode_location TEXT NOT NULL,
    has_captions BOOLEAN NOT NULL,
    captions_location TEXT,
    season_id INTEGER NOT NULL,
    FOREIGN KEY (season_id) REFERENCES season(id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- Tabela relacji użytkownik-odcinek
CREATE TABLE app_user_episode (
    id SERIAL PRIMARY KEY,
    app_user_id INTEGER NOT NULL,
    episode_id INTEGER NOT NULL,
    time_watched INTEGER,
    FOREIGN KEY (app_user_id) REFERENCES app_user(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (episode_id) REFERENCES episode(id) ON DELETE NO ACTION ON UPDATE NO ACTION
);
