package org.example;

/*
        1. There are 10 people in a group who are planning to go to trip but some of them having budget issue.
        2. Per person budget for a trip would be 5000
        3. Now Create two group who affort to go to trip and those who don't affort
        4. print index of group A and Group B
        5, values - 3500, 5000, 7000, 8000, 5400, 7000, 9000, 3300, 2000, 6500
 */
//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {

        int values[] = {3500, 5000, 7000, 8000, 5400, 7000, 9000, 3300, 2000, 6500};
        int i;

        int group_A[] = new int[values.length];
        int group_B[] = new int[values.length];

        int a_count = 0;
        int b_count = 0;
        for (i = 0; i < values.length; i++) {
            // System.out.println(values[i]);
            if (values[i] >= 5000) {
                group_A[i] = values[i];

            } else {
                group_B[i] = values[i];
            }



        }
        System.out.println("****** group A ready for trip******");
        for(int number: group_A){
            if(number != 0) {
                System.out.println(number);
            }
        }
        System.out.println("***********group B not ready for trip ******");
        for(int numbers: group_B){
            if(numbers != 0) {
                System.out.println(numbers);
            }
        }


        }


    }
