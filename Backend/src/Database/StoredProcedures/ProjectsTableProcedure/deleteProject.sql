CREATE PROCEDURE deleteProject(@project_id VARCHAR(100))
AS
BEGIN
DELETE FROM ProjectsTable
WHERE project_id=@project_id
END