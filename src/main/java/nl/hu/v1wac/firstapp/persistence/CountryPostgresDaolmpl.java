package nl.hu.v1wac.firstapp.persistence;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import nl.hu.v1wac.firstapp.model.Country;

public class CountryPostgresDaolmpl extends PostgresBaseDao implements CountryDao {
	public boolean save(Country country) {
		return true;
	}
	
	private List<Country> getCountries(String query) {
		List<Country> results = new ArrayList<Country>();
		
		try (Connection con = super.getConnection()) {
			PreparedStatement pstmt = con.prepareStatement(query);
			ResultSet dbResultSet = pstmt.executeQuery();
			
			while (dbResultSet.next()) {
				String code = dbResultSet.getString("code");
				String iso3 = dbResultSet.getString("iso3");
				String nm = dbResultSet.getString("name"); 
				String cap = dbResultSet.getString("capital");
				String ct = dbResultSet.getString("continent");
				String reg = dbResultSet.getString("region");
				double sur = dbResultSet.getDouble("surfacearea"); 
				int pop = dbResultSet.getInt("population");
				String gov = dbResultSet.getString("governmentform");
				double lat = dbResultSet.getDouble("latitude");
				double lng = dbResultSet.getDouble("longitude");
				
				Country c = new Country(code, iso3, nm, cap, ct, reg, sur, pop, gov, lat, lng);
				results.add(c);
			}
		} catch (SQLException sqle) { sqle.printStackTrace(); }
		
		return results;
	}
	
	public List<Country> findAll() {
		return this.getCountries("select * from country");
	}
	
	public Country findByCode(String codeSearch) {
		Country result = null;
		
		try (Connection con = super.getConnection()) {
			PreparedStatement pstmt = con.prepareStatement("select * from country where code = " + codeSearch);
			ResultSet dbResultSet = pstmt.executeQuery();
			
			while (dbResultSet.next()) {
				String code = dbResultSet.getString("code");
				String iso3 = dbResultSet.getString("iso3");
				String nm = dbResultSet.getString("name"); 
				String cap = dbResultSet.getString("capital");
				String ct = dbResultSet.getString("continent");
				String reg = dbResultSet.getString("region");
				double sur = dbResultSet.getDouble("surfacearea"); 
				int pop = dbResultSet.getInt("population");
				String gov = dbResultSet.getString("governmentform");
				double lat = dbResultSet.getDouble("latitude");
				double lng = dbResultSet.getDouble("longitude");
				
				result = new Country(code, iso3, nm, cap, ct, reg, sur, pop, gov, lat, lng);
			}
		} catch (SQLException sqle) { sqle.printStackTrace(); }
		
		return result;
	}
	
	public List<Country> find10LargestPopulations() {
		return this.getCountries("select * from country order by population DESC limit 10");
	}
	
	public List<Country> find10LargestSurfaces() {
		return this.getCountries("select * from country order by surfacearea DESC limit 10");
	}
	
	public boolean update(Country country) {
		return true;
	}
	
	public boolean delete(Country country) {
		return true;
	}
}
