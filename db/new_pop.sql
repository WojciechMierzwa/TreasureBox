-- 1. app_user
INSERT INTO app_user (name, password, profile_picture, require_credentials)
VALUES 
('Jan Kowalski', 'pass123', 1, true),
('Anna Nowak', 'qwerty', 2, false),
('Piotr Zieliński', 'abc123', 3, true),
('Kasia Wiśniewska', 'xyz789', 4, false),
('Tomasz Mazur', 'testpass', 5, true);

-- 2. film
INSERT INTO film (name, duration, film_location, has_captions, captions_location, genre)
VALUES
('Matrix', 136, '/movies/matrix.mp4', true, '/captions/matrix.srt', 'Sci-Fi'),
('Inception', 148, '/movies/inception.mp4', true, '/captions/inception.srt', 'Thriller'),
('Shrek', 90, '/movies/shrek.mp4', false, NULL, 'Animation'),
('Gladiator', 155, '/movies/gladiator.mp4', true, '/captions/gladiator.srt', 'Drama'),
('Avengers', 143, '/movies/avengers.mp4', true, '/captions/avengers.srt', 'Action');

-- 3. series
INSERT INTO series (name, genre, picture, season_count, episodes_count)
VALUES
('Breaking Bad', 'Crime', '/img/breaking_bad.jpg', 5, 62),
('Stranger Things', 'Sci-Fi', '/img/stranger_things.jpg', 4, 34),
('The Office', 'Comedy', '/img/office.jpg', 9, 201),
('Friends', 'Comedy', '/img/friends.jpg', 10, 236),
('Dark', 'Sci-Fi', '/img/dark.jpg', 3, 26);

-- 4. app_user_series
INSERT INTO app_user_series (series_id, app_user_id)
VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 1),
(5, 4);

-- 5. app_user_film
INSERT INTO app_user_film (time_watched, app_user_id, film_id)
VALUES
(45, 1, 1),
(148, 2, 2),
(90, 3, 3),
(100, 4, 4),
(143, 5, 5);

-- 6. season
INSERT INTO season (name, series_id)
VALUES
('Season 1', 1),
('Season 1', 2),
('Season 1', 3),
('Season 1', 4),
('Season 1', 5);

-- 7. episode
INSERT INTO episode (season_number, episode_number, name, duration, episode_location, has_captions, captions_location, season_id)
VALUES
(1, 1, 'Pilot', 58, '/episodes/bb_s1e1.mp4', true, '/captions/bb_s1e1.srt', 1),
(1, 2, 'Cats in the Bag...', 48, '/episodes/bb_s1e2.mp4', true, '/captions/bb_s1e2.srt', 1),
(1, 1, 'Chapter One', 50, '/episodes/st_s1e1.mp4', true, '/captions/st_s1e1.srt', 2),
(1, 1, 'The Dundies', 22, '/episodes/office_s1e1.mp4', false, NULL, 3),
(1, 1, 'The One Where...', 24, '/episodes/friends_s1e1.mp4', true, '/captions/friends_s1e1.srt', 4);

-- 8. app_user_episode
INSERT INTO app_user_episode (app_user_id, episode_id, time_watched)
VALUES
(1, 1, 30),
(2, 2, 48),
(3, 3, 20),
(4, 4, 15),
(5, 5, 24);
