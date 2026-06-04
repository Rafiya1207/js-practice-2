package com.step.planets;

public enum Planet {
  MERCURY("mercury"),
    VENUS("venus")  ,
    EARTH("earth")   ,
    MARS("mars")   ,
    JUPITER("jupiter"),
    SATURN("saturn") ,
    URANUS("uranus") ,
    NEPTUNE("neptune");

  private final String planet;

  Planet(String planet) {
    this.planet = planet;
  }

  public String getPlanet() {
    return this.planet;
  }

};