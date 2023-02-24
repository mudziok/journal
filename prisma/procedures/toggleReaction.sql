CREATE OR REPLACE PROCEDURE toggle_reaction (vemote text, vusername text, ventry_author_username text, ventry_day date)
LANGUAGE plpgsql
AS $$
DECLARE
  exist boolean;
BEGIN
  SELECT INTO exist EXISTS (SELECT * FROM reactions WHERE emote = vemote AND username = vusername AND entry_author_username = ventry_author_username AND entry_day = ventry_day);
  IF (exist) THEN
  	DELETE FROM reactions WHERE emote = vemote AND username = vusername AND entry_author_username = ventry_author_username AND entry_day = ventry_day;
  ELSE
    INSERT INTO reactions VALUES (vemote, vusername, ventry_author_username, ventry_day);
  END IF;
END $$;