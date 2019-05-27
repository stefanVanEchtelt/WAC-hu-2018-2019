package nl.hu.v1wac.firstapp.persistence;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import nl.hu.v1wac.firstapp.model.Country;

public class UserPostgresDaolmpl extends PostgresBaseDao implements UserDao {
	public String findRoleForUser(String name, String pass) {
		String result = null;
		try (Connection con = super.getConnection()) {
			PreparedStatement pstmt = con.prepareStatement("select * from useraccount "
					+ "where username = '" + name + "' and password = '" + pass + "'");
			ResultSet dbResultSet = pstmt.executeQuery();
			
			while (dbResultSet.next()) {
				result = dbResultSet.getString("role");
			}
		} catch (SQLException sqle) { sqle.printStackTrace(); }
		
		return result;
	}
}
