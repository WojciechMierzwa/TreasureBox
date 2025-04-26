
INSERT INTO AppUser (name, password, profile_picture, require_credentials) VALUES
('Alice', 'pass123', 1, TRUE),
('Bob', 'secure456', 2, FALSE),
('Charlie', 'qwerty789', 3, TRUE),
('Diana', '12345', 4, FALSE),
('Evan', 'password', 3, TRUE),
('Fiona', 'letmein', 2, TRUE),
('George', 'monkey', 1, FALSE),
('Hannah', 'sunshine', 2, TRUE),
('Ivan', 'princess', 3, FALSE),
('Julia', 'admin', 4, TRUE);


INSERT INTO Film (name, duration, film_location, has_captions, captions_location, media_type, genre) VALUES
('Inception', 148, '/movies/inception.mp4', TRUE, '/captions/inception.srt', 'Movie', 'Sci-Fi'),
('The Office', 22, '/series/the_office.mp4', TRUE, '/captions/the_office.srt', 'Series', 'Comedy'),
('Breaking Bad', 47, '/series/breaking_bad.mp4', TRUE, '/captions/breaking_bad.srt', 'Series', 'Drama'),
('Interstellar', 169, '/movies/interstellar.mp4', TRUE, '/captions/interstellar.srt', 'Movie', 'Sci-Fi'),
('The Crown', 58, '/series/the_crown.mp4', TRUE, '/captions/the_crown.srt', 'Series', 'Historical Drama'),
('Friends', 24, '/series/friends.mp4', FALSE, NULL, 'Series', 'Comedy'),
('The Matrix', 136, '/movies/matrix.mp4', TRUE, '/captions/matrix.srt', 'Movie', 'Sci-Fi'),
('Game of Thrones', 55, '/series/got.mp4', TRUE, '/captions/got.srt', 'Series', 'Fantasy'),
('Avatar', 162, '/movies/avatar.mp4', TRUE, '/captions/avatar.srt', 'Movie', 'Fantasy'),
('Stranger Things', 51, '/series/stranger_things.mp4', TRUE, '/captions/stranger_things.srt', 'Series', 'Horror');


INSERT INTO TVShow (season_count, episodes_count, Film_id) VALUES
(9, 201, 2),
(5, 62, 3),
(6, 60, 5),
(10, 236, 6),
(8, 73, 8),
(4, 34, 10),
(3, 30, 5),
(2, 20, 10),
(1, 8, 8),
(5, 50, 3);


INSERT INTO episode (season_number, episode_number, name, duration, episode_location, has_captions, captions_location, tvshow_id) VALUES
(1, 1, 'Pilot', 22, '/series/the_office/s01e01.mp4', TRUE, '/captions/the_office/s01e01.srt', 1),
(1, 2, 'Diversity Day', 22, '/series/the_office/s01e02.mp4', TRUE, '/captions/the_office/s01e02.srt', 1),
(1, 1, 'Breaking Bad - Pilot', 58, '/series/breaking_bad/s01e01.mp4', TRUE, '/captions/breaking_bad/s01e01.srt', 2),
(1, 2, 'Cat''s in the Bag...', 48, '/series/breaking_bad/s01e02.mp4', TRUE, '/captions/breaking_bad/s01e02.srt', 2),
(1, 1, 'Wolferton Splash', 58, '/series/the_crown/s01e01.mp4', TRUE, '/captions/the_crown/s01e01.srt', 3),
(1, 1, 'The One Where Monica Gets a Roommate', 24, '/series/friends/s01e01.mp4', FALSE, NULL, 4),
(1, 1, 'Winter Is Coming', 62, '/series/got/s01e01.mp4', TRUE, '/captions/got/s01e01.srt', 5),
(1, 1, 'Chapter One: The Vanishing', 48, '/series/stranger_things/s01e01.mp4', TRUE, '/captions/stranger_things/s01e01.srt', 6),
(1, 2, 'Chapter Two: The Weirdo', 55, '/series/stranger_things/s01e02.mp4', TRUE, '/captions/stranger_things/s01e02.srt', 6),
(2, 1, 'The Dundies', 22, '/series/the_office/s02e01.mp4', TRUE, '/captions/the_office/s02e01.srt', 1);


INSERT INTO AppUserFilm (AppUser_id, Film_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10);
