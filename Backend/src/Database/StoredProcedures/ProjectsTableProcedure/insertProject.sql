CREATE PROCEDURE insertProject(
@project_id VARCHAR(100),
@project_name VARCHAR(200),
@project_description VARCHAR(500),
@due_date VARCHAR(100)
)
AS
BEGIN
INSERT INTO ProjectsTable(project_id,project_name,project_description,due_date)
VALUES(
@project_id,
@project_name,
@project_description,
@due_date)
END


