- Match words that start and end with the same letter.

```/\b(\w)\w+\1\b/g```

- Match any three-digit number where one digit repeats later in the same number.

- eg: 
  - 112 - true
  - 121 - true
  - 122 - true
  - 111 - true
  - 231 - false

```/(\d)[\d\1]?\1/```

- Match dates where the same separator is used consistently between all parts.

- eg: 
  - 02/12/2007 - true
  - 08-03-2003 - true
  - 08|03|2003 - true
  - 08-03/2003 - false

```/\d\d(.)\d\d\1\d\d\d\d/```

- Match strings where a single digit appears three times in the same string.

```/(\d).*\1.*\1.*\1/```

- Match any word where a three-letter sequence appears again later in the same word.

```/\b\w*(\w\w\w)\w*\1\w*\b/g```


- Match pairs of characters where the first character repeats after exactly two other characters, like a??a.

```/\b(\w)..\1/g```

- Match patterns where a captured number appears again later in the string.

```/\b\w*(\d+)\w*\1\w*\b/g```